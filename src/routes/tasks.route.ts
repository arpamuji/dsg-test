import express from 'express';
import {
    createTask,
    deleteTask,
    getTaskById,
    getTasks,
    updateTask,
} from '../controllers/tasks.controller';
import { validate } from '../middleware/validation';
import {
    createTaskSchema,
    taskParamsSchema,
    updateTaskSchema,
} from '../validators/tasks.validator';

const taskRouter = express.Router();

// Get All Task
taskRouter.get('/', getTasks);

// Get Spesific Task
taskRouter.get('/:id', validate(taskParamsSchema, 'params'), getTaskById);

// Create Task
taskRouter.post('/', validate(createTaskSchema, 'body'), createTask);

// Update Task
taskRouter.put('/:id', validate(taskParamsSchema, 'params'), validate(updateTaskSchema, 'body'), updateTask);

// Delete Task
taskRouter.delete('/:id', validate(taskParamsSchema, 'params'), deleteTask);

export default taskRouter;
