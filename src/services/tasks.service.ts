import 'dotenv/config';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../../generated/prisma/client';
    
import type { CreateTaskData, Task, UpdateTaskData } from '../types/task.types';

const connectionString = `${process.env.DATABASE_URL}`;
const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

// Get All Tasks
const getTasks = async (): Promise<Task[]> => {
    return await prisma.task.findMany();
};

// Get Task by Id
const getTaskById = async (id: string): Promise<Task | null> => {
    const task = await prisma.task.findUnique({ where: { id: id } });

    if (!task) {
        return null;
    }

    return task;
};

// Create Task
const createTask = async (data: CreateTaskData): Promise<Task> => {
    return await prisma.task.create({ data: data });
};

// Update Task
const updateTask = async (id: string, data: UpdateTaskData): Promise<Task | null> => {
    const task = await prisma.task.findUnique({ where: { id: id } });

    if (!task) {
        return null;
    }

    return await prisma.task.update({
        where: {
            id: id,
        },
        data: data,
    });
};

// Delete Task
const deleteTask = async (id: string): Promise<Task | null> => {
    const task = await prisma.task.findUnique({ where: { id: id } });

    if (!task) {
        return null;
    }

    return await prisma.task.delete({
        where: {
            id: id,
        },
    });
};

export { getTasks, getTaskById, createTask, updateTask, deleteTask };
