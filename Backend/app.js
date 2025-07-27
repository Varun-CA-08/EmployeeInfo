import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { router as employeeRoute } from './Routes/employeeRoute.js';

const app = express();
app.use(cors());
app.use(express.json());
dotenv.config();

app.use('/api/employees', employeeRoute);

export default app;
