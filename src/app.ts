import express from 'express';
import taskRouter from './routes/tasks.route';
import { errorHandler } from './middleware/errorHandler';

import type { Express } from 'express';

function createApp(): Express {
    const app = express();

    app.use(express.json());
    app.use('/api/tasks', taskRouter);
    app.get('/health', (req, res) => {
        res.send('[INFO] API service is Ready to use.');
    });

    app.use(errorHandler);

    return app;
}

export default createApp;
