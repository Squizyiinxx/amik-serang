import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const POST = async (req: NextRequest) => {
    if (req.method === 'POST') {
        try {
            const formData = await req.formData();

            const { title, date } = Object.fromEntries(formData.entries());
            const data = {
                title: title as string,
                date: new Date(date as string),
            };

            const newNews = await prisma.announcement.create({
                data,
            });

            return NextResponse.json(newNews);
        } catch (error) {
            return NextResponse.json({ error: 'Error processing request' }, { status: 500 });
        }
    } else {
        return NextResponse.json({ message: 'Method not allowed' }, { status: 405 });
    }
};

export async function GET() {
    try {
        const data = await prisma.announcement.findMany();
        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.error();
    }
}
