import { describe, it, expect } from 'vitest';
import request from 'supertest';
import createApp from '../src/app';

const app = createApp();
const baseUrl = '/api';

describe('Tasks API', () => {
    it('Test 1: should create a new task', async () => {
        const response = await request(app).post(`${baseUrl}/tasks`).send({
            title: 'Test Task',
            description: 'This is a test task',
        });

        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.data).toHaveProperty('id');
        expect(response.body.data.title).toBe('Test Task');
        expect(response.body.data.description).toBe('This is a test task');
        expect(response.body.data.completed).toBe(false);
    });

    it('Test 2: should retrieve all tasks', async () => {
        const response = await request(app).get(`${baseUrl}/tasks`);

        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);
        expect(Array.isArray(response.body.data)).toBe(true);
    });

    it('Test 3: should retrieve a task by ID', async () => {
        const createResponse = await request(app).post(`${baseUrl}/tasks`).send({
            title: 'Test Task for Retrieval',
            description: 'This task is created for retrieval test',
        });

        const taskId = createResponse.body.data.id;

        const response = await request(app).get(`${baseUrl}/tasks/${taskId}`);

        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.data.id).toBe(taskId);
        expect(response.body.data.title).toBe('Test Task for Retrieval');
        expect(response.body.data.description).toBe('This task is created for retrieval test');
        expect(response.body.data.completed).toBe(false);
    });

    it('Test 4: should update a task', async () => {
        const createResponse = await request(app).post(`${baseUrl}/tasks`).send({
            title: 'Test Task for Update',
            description: 'This task is created for update test',
        });

        const taskId = createResponse.body.data.id;

        const response = await request(app).put(`${baseUrl}/tasks/${taskId}`).send({
            title: 'Updated Test Task',
            description: 'This task has been updated',
            completed: true,
        });

        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.data.id).toBe(taskId);
        expect(response.body.data.title).toBe('Updated Test Task');
        expect(response.body.data.description).toBe('This task has been updated');
        expect(response.body.data.completed).toBe(true);
    });

    it('Test 5: should delete a task', async () => {
        const createResponse = await request(app).post(`${baseUrl}/tasks`).send({
            title: 'Test Task for Deletion',
            description: 'This task is created for deletion test',
        });

        const taskId = createResponse.body.data.id;

        const response = await request(app).delete(`${baseUrl}/tasks/${taskId}`);

        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.data.id).toBe(taskId);
    });

    it('Test 6: Returns 400 when title is empty (validation)', async () => {
        const response = await request(app).post(`${baseUrl}/tasks`).send({
            title: '',
            description: 'This is a test task',
        });

        expect(response.status).toBe(400);
        expect(response.body.success).toBe(false);
    });

    it('Test 7: should return 400 for invalid UUID format', async () => {
        const response = await request(app).get(`${baseUrl}/tasks/invalid-uuid`);

        expect(response.status).toBe(400);
        expect(response.body.success).toBe(false);
        expect(response.body.error.code).toBe('VALIDATION_ERROR');
    });

    it('Test 8: should return 404 for non-existent task', async () => {
        const fakeId = '123e4567-e89b-12d3-a456-426614174000';

        const response = await request(app).get(`${baseUrl}/tasks/${fakeId}`);

        expect(response.status).toBe(404);
        expect(response.body.success).toBe(false);
        expect(response.body.error.code).toBe('NOT_FOUND');
    });

    it('Test 9: should return 404 when updating non-existent task', async () => {
        const fakeId = '123e4567-e89b-12d3-a456-426614174000';

        const response = await request(app).put(`${baseUrl}/tasks/${fakeId}`).send({
            title: 'Updated Test Task',
            description: 'This task has been updated',
            completed: true,
        });

        expect(response.status).toBe(404);
        expect(response.body.success).toBe(false);
        expect(response.body.error.code).toBe('NOT_FOUND');
    });

    it('Test 10: should return 404 when deleting non-existent task', async () => {
        const fakeId = '123e4567-e89b-12d3-a456-426614174000';

        const response = await request(app).delete(`${baseUrl}/tasks/${fakeId}`);

        expect(response.status).toBe(404);
        expect(response.body.success).toBe(false);
        expect(response.body.error.code).toBe('NOT_FOUND');
    });
});
