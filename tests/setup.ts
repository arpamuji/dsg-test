import 'dotenv/config';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../generated/prisma/client';
import { beforeAll, afterAll, beforeEach } from 'vitest';

const connectionString = `${process.env.DATABASE_URL}`;
const adapter = new PrismaPg({ connectionString });
const testPrisma = new PrismaClient({ adapter });

beforeAll(async () => {
    await testPrisma.$connect();
});

beforeEach(async () => {
    await testPrisma.task.deleteMany();
});

afterAll(async () => {
    await testPrisma.$disconnect();
});
