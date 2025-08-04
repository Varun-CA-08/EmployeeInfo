import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import { employeeRoute } from './Routes/employeeRoute.js'; // ✅ match export name

const app = express();
app.use(cors());
app.use(express.json());
dotenv.config();
connectDB();

app.use('/api/employees', employeeRoute);

export default app;
