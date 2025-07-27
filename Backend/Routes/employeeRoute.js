import { Router } from 'express';
import {
  getEmployees,
  getEmployeeById,
  addEmployee,
  updateEmployee,
  deleteEmployee
} from '../Controllers/employeeController.js';

export const router = Router();

router.post('/', addEmployee);

router.get('/', getEmployees);

router.get('/:id', getEmployeeById);

router.put('/:id', updateEmployee);

router.delete('/:id', deleteEmployee);

export const employeeRoute = router;
