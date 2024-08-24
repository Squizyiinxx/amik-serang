import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import path from 'path';
import supabase from '@/lib/supabase';

const prisma = new PrismaClient();

export const POST = async (req: NextRequest) => {
    if (req.method === 'POST') {
        try {
            const formData = await req.formData();
            const file = formData.get('picture') as File;
            if (!file) {
                throw new Error('File not found in form data');
            }

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

            const publicURL = supabase.storage
                .from('web-amik-storage')
                .getPublicUrl(`uploads/${newFileName}`).data.publicUrl;

            if (!publicURL) {
                throw new Error('Failed to generate public URL');
            }

            const { Judul, content, kategoriId, userId } = Object.fromEntries(formData.entries());
            const data = {
                Judul: Judul as string,
                content: content as string,
                kategoriId: parseInt(kategoriId as string, 10),
                userId: parseInt(userId as string, 10),
                picture: publicURL,
            };

            const newNews = await prisma.news.create({
                data: data,
            });

            return NextResponse.json(newNews);
        } catch (error) {
            return NextResponse.json({ error: 'Error processing request' }, { status: 500 });
        }
    } else {
        return NextResponse.json({ message: 'Method not allowed' }, { status: 405 });
    }
};
