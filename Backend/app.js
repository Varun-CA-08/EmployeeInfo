import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import {router as todoRoute} from './Routes/todoRoute.js';

const app = express();
app.use(cors());
app.use(express.json());
dotenv.config();

app.use('/api/todos', todoRoute);

export default app;
