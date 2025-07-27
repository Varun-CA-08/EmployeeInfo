import axios from 'axios';

const BASE_URL = 'http://localhost:4000/api/employees';

export const getEmployees = () => axios.get(BASE_URL);

export const getEmployeeById = (id) => axios.get(`${BASE_URL}/${id}`);

export const addEmployee = (employee) => axios.post(BASE_URL, employee);

export const updateEmployee = (id, updatedData) => axios.put(`${BASE_URL}/${id}`, updatedData);

export const deleteEmployee = (id) => axios.delete(`${BASE_URL}/${id}`);
