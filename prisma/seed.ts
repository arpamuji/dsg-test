import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../generated/prisma/client';
import { tasks } from './data.js';

const connectionString = `${process.env.DATABASE_URL}`;
const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

async function main() {
    await prisma.task.deleteMany();

    await prisma.task.createMany({
        data: tasks,
    });

    console.log(`[INFO] Successfully Seeded ${tasks.length}`);
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();

        process.exit(1);
    });
