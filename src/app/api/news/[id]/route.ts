import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';
import { Readable } from 'stream';
import { pipeline } from 'stream';
import { promisify } from 'util';

const prisma = new PrismaClient();
const pump = promisify(pipeline);


const webReadableStreamToNodeReadable = (webStream: ReadableStream<Uint8Array>): Readable => {
    const nodeReadable = new Readable({
        read() { }
    });

    const reader = webStream.getReader();

    (async () => {
        try {
            while (true) {
                const { done, value } = await reader.read();
                if (done) break;
                nodeReadable.push(Buffer.from(value));
            }
            nodeReadable.push(null);
        } catch (err) {
            nodeReadable.destroy();
        }
    })();

    return nodeReadable;
};

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        const newsId = await prisma.news.findUniqueOrThrow({
            where: {
                id: parseInt(params.id, 10),
            },
            include: {
                user: true,
                kategori: true,
            }
        });

        if (!newsId) {
            return NextResponse.json({ message: 'News not found' }, { status: 404 });
        }

        return NextResponse.json(newsId);
    } catch (error) {
        console.error('Error fetching news:', error);
        return NextResponse.error();
    }
}
export const POST = async (req: NextRequest) => {
    if (req.method === 'POST') {
        try {
            const formData = await req.formData();
            const file = formData.get('picture') as File;
            if (!file) {
                throw new Error('File not found in form data');
            }

            const filePath = path.join(process.cwd(), 'public/uploads', file.name);
            const nodeReadableStream = webReadableStreamToNodeReadable(file.stream());
            const writeStream = fs.createWriteStream(filePath);

            await pump(nodeReadableStream, writeStream);

            const { Judul, content, kategoriId, userId } = Object.fromEntries(formData.entries());
            const data = {
                Judul: Judul as string,
                content: content as string,
                kategoriId: parseInt(kategoriId as string, 10),
                userId: parseInt(userId as string, 10),
                picture: file.name,
            };
            const newNews = await prisma.news.create({
                data: data
            });

            return NextResponse.json(newNews);
        } catch (error) {
            console.error('Error processing request:', error);
            return NextResponse.json({ error: 'Error processing request' }, { status: 500 });
        }
    } else {
        return NextResponse.json({ message: 'Method not allowed' }, { status: 405 });
    }
};
export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
    const { id } = params;

    try {
        const formData = await req.formData();
        const file = formData.get('picture') as File;

        let pictureName: string | null = null;

        if (file) {
            const filePath = path.join(process.cwd(), 'public/uploads', file.name);
            const nodeReadableStream = webReadableStreamToNodeReadable(file.stream());
            const writeStream = fs.createWriteStream(filePath);

            await pump(nodeReadableStream, writeStream);
            pictureName = file.name;
        }

        const { Judul, content, kategoriId, userId } = Object.fromEntries(formData.entries());

        const updateData: any = {
            Judul: Judul as string,
            content: content as string,
            kategoriId: parseInt(kategoriId as string, 10),
            userId: parseInt(userId as string, 10),
        };

        if (pictureName) {
            updateData.picture = pictureName;
        }

        const updatedNews = await prisma.news.update({
            where: { id: parseInt(id, 10) },
            data: updateData,
        });
        return NextResponse.json(updatedNews);
    } catch (error) {
        console.error('Error updating news:', error);
        return NextResponse.json({ error: 'Error updating news' }, { status: 500 });
    }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
    const { id } = params;

    try {
        const news = await prisma.news.findUnique({
            where: { id: parseInt(id, 10) },
            select: { picture: true },
        });

        if (!news) {
            return NextResponse.json({ error: 'News not found' }, { status: 404 });
        }

        const picturePath = path.join(process.cwd(), 'public/uploads', news.picture);

        fs.unlinkSync(picturePath);
        await prisma.news.delete({
            where: { id: parseInt(id, 10) },
        });

        return NextResponse.json({ message: 'News deleted successfully' });
    } catch (error) {
        console.error('Error deleting news:', error);
        return NextResponse.json({ error: 'Error deleting news' }, { status: 500 });
    }
}
