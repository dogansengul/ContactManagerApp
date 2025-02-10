import 'dotenv/config';
import express from 'express';

import { connectDB } from './config/dbConnection.js';
import errorHandler from './middleware/errorHandler.js';
import contactRouter from './routes/contactRoutes.js';
import userRouter from './routes/userRoutes.js';
import AppError from './util/AppError.js';

await connectDB();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use('/api/contacts', contactRouter);
app.use('/api/users', userRouter);

app.use('/', (req, res, next) => {
    console.log('req came');
    res.status(404);
    throw new AppError('Page not found.', 404);
});

app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
});

app.use(errorHandler);
