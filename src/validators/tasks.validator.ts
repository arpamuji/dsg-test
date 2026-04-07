import { z } from 'zod';

export const createTaskSchema = z.object({
    title: z
        .string()
        .min(1, 'Title cannot be empty')
        .max(200, 'Title must be less than 200 characters'),
    description: z
        .string()
        .max(1024, 'Description must be less than 1024 characters')
        .nullable()
        .optional(),
});

export const updateTaskSchema = z.object({
    title: z
        .string()
        .min(1, 'Title cannot be empty')
        .max(200, 'Title must be less than 200 characters'),
    description: z
        .string()
        .max(1024, 'Description must be less than 1024 characters')
        .nullable()
        .optional(),
    completed: z.boolean().optional(),
});

export const taskParamsSchema = z.object({
    id: z.uuid('Invalid ID'),
});