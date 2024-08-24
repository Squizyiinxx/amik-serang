import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';
import { Readable } from 'stream';
import { pipeline } from 'stream';
import { promisify } from 'util';
import supabase from '@/lib/supabase';

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

        return NextResponse.error();
    }
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
    const { id } = params;

    try {
        const formData = await req.formData();
        const file = formData.get('picture') as File;
        let pictureURL: string | null = null;

        if (file) {
            const randomDigits = Math.floor(100000 + Math.random() * 900000); 
            const newFileName = `AMIK-${randomDigits}${path.extname(file.name)}`;

            const { data: uploadData, error: uploadError } = await supabase.storage
                .from('web-amik-storage')
                .upload(`uploads/${newFileName}`, file, {
                    cacheControl: '3600',
                    upsert: false,
                    contentType: file.type,
                });

            if (uploadError) {
                throw new Error('Error uploading file to Supabase storage: ' + uploadError.message);
            }

            const { data: publicUrlData } = supabase.storage
                .from('web-amik-storage')
                .getPublicUrl(`uploads/${newFileName}`);

            if (!publicUrlData) {
                throw new Error('Failed to generate public URL');
            }

            pictureURL = publicUrlData.publicUrl;
        }

        const { Judul, content, kategoriId, userId } = Object.fromEntries(formData.entries());

        const updatedNews = await prisma.news.update({
            where: { id: parseInt(id, 10) },
            data: {
                Judul: Judul as string,
                content: content as string,
                kategoriId: parseInt(kategoriId as string, 10),
                userId: parseInt(userId as string, 10),
                picture: pictureURL || undefined, 
            },
        });

        return NextResponse.json(updatedNews);
    } catch (error) {
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

        const picturePath = news.picture.split('/').pop() as string;

        if (picturePath) {
            const { error: deleteError } = await supabase.storage
                .from('web-amik-storage')
                .remove([`uploads/${picturePath}`]);

            if (deleteError) {
                return NextResponse.json({ error: 'Error deleting file from Supabase storage' }, { status: 500 });
            }
        }
        await prisma.news.delete({
            where: { id: parseInt(id, 10) },
        });

        return NextResponse.json({ message: 'News deleted successfully' });
    } catch (error) {
        console.error('Error deleting news:', error);
        return NextResponse.json({ error: 'Error deleting news' }, { status: 500 });
    }
}