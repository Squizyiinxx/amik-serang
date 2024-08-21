import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const limit = searchParams.get('limit');
    const categoryId = searchParams.get('category');

    try {
        const news = await prisma.news.findMany({
            where: categoryId ? { kategoriId: parseInt(categoryId) } : {},
            include: {
                user: true,
                kategori: true,
            },
            take: limit ? parseInt(limit) : undefined,
        });
        return NextResponse.json(news);
    } catch (error) {
        return NextResponse.error();
    }
}
