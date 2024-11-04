const { PrismaClient } = require('@prisma/client');
const { hash } = require('bcrypt');

const prisma = new PrismaClient();

async function main() {
    await prisma.category.createMany({
        data: [
            { nama: 'Artikel' },
            { nama: 'Tutorial' },
            { nama: 'Technology' },
        ],
    });

    // Seed users
    const hashPassword = await hash('123456', 10);
    await prisma.user.upsert({
        where: { email: 'admin@amik.com' },
        update: {
            name: 'Alice',
            password: hashPassword,
            image: '/person.jpeg'
        },
        create: {
            name: 'Alice',
            email: 'admin@amik.com',
            password: hashPassword,
            image: '/person.jpeg'
        }
    });
}

main()
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
