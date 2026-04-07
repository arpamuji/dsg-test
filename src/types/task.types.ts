type Task = {
    id: string;
    title: string;
    description?: string | null;
    completed: boolean;
    createdAt: Date;
    updatedAt: Date;
};

type CreateTaskData = Omit<Task, 'id' | 'createdAt' | 'updatedAt'>;
type UpdateTaskData = Pick<Task, 'title' | 'description' | 'completed'>;

export type { Task, CreateTaskData, UpdateTaskData };
