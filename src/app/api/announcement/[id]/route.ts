import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
    const { id } = params;

    try {
        await prisma.announcement.delete({
            where: { id: parseInt(id, 10) },
        });

        return NextResponse.json({ message: 'News deleted successfully' });
    } catch (error) {
        console.error('Error deleting announcement:', error);
        return NextResponse.json({ error: 'Error deleting announcement' }, { status: 500 });
    }
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
    const { id } = params;
    
    try {
        const formData = await req.formData();
        const { title, date } = Object.fromEntries(formData.entries());
        const data = {
            title: title as string,
            date: new Date(date as string),
        };
        const updatedAnnouncement = await prisma.announcement.update({
            where: { id: parseInt(id, 10) },
            data,
        });

        return NextResponse.json(updatedAnnouncement);
    } catch (error) {
        console.error('Error updating announcement:', error);
        return NextResponse.json({ error: 'Error updating announcement' }, { status: 500 });
    }
}

