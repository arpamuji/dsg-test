import type { Request, Response, NextFunction } from 'express';
import {
    getTasks as getTasksService,
    getTaskById as getTaskByIdService,
    createTask as createTaskService,
    updateTask as updateTaskService,
    deleteTask as deleteTaskService,
} from '../services/tasks.service';
import { success } from '../utils/response';
import { NotFoundError } from '../utils/apiError';

// Get All Tasks
const getTasks = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const tasks = await getTasksService();

        return success(res, tasks, 'Tasks retrieved successfully');
    } catch (err) {
        next(err);
    }
};

// Get Task by ID
const getTaskById = async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id;

        const task = await getTaskByIdService(id);

        if (!task) {
            console.log(`[INFO] Task not found with ID: ${id}`);

            throw new NotFoundError('Task', id);
        }

        return success(res, task, 'Task retrieved successfully');
    } catch (err) {
        next(err);
    }
};

// Create Task
const createTask = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data = req.body;
        const task = await createTaskService(data);

        console.log(`[INFO] Task created with ID: ${task.id}`);

        return success(res, task, 'Task created successfully');
    } catch (err) {
        next(err);
    }
};

// Update Task
const updateTask = async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id;
        const data = req.body;
        const task = await updateTaskService(id, data);

        if (!task) {
            console.log(`[INFO] Task not found with ID: ${id}`);

            throw new NotFoundError('Task', id);
        }

        console.log(`[INFO] Task updated with ID: ${task.id}`);

        return success(res, task, 'Task updated successfully');
    } catch (err) {
        next(err);
    }
};

// Delete Task
const deleteTask = async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id;
        const task = await deleteTaskService(id);

        if (!task) {
            console.log(`[INFO] Task not found with ID: ${id}`);

            throw new NotFoundError('Task', id);
        }

        console.log(`[INFO] Task deleted with ID: ${task.id}`);

        return success(res, task, 'Task deleted successfully');
    } catch (error) {
        next(error);
    }
};

export { getTasks, getTaskById, createTask, updateTask, deleteTask };
