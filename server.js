import 'dotenv/config';
import express from 'express';
import errorHandler from './middleware/errorHandler.js';
import contactRouter from './routes/contactRoutes.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use('/api/contacts', contactRouter);

app.use('/', (req, res, next) => {
    console.log('req came');
    res.status(404);
    throw new Error('Page not found.');
});

app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
});

app.use(errorHandler);
