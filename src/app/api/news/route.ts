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
