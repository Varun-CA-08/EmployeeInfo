let employees = [];
let nextId = 1;

export const addEmployee = (req, res) => {
  const { name, email, department } = req.body;

  if (!name || !email || !department) {
    return res.status(400).json({ message: 'Name, email, and department are required.' });
  }

  const newEmployee = {
    id: nextId++,
    name,
    email,
    department,
  };

  employees.push(newEmployee);
  return res.status(201).json({ message: 'Employee added successfully!', employee: newEmployee });
};

export const getEmployees = (req, res) => {
  return res.status(200).json(employees);
};

export const getEmployeeById = (req, res) => {
  const { id } = req.params;
  const employee = employees.find(emp => emp.id === parseInt(id));

  if (!employee) {
    return res.status(404).json({ message: 'Employee not found' });
  }

  return res.status(200).json(employee);
};

export const updateEmployee = (req, res) => {
  const { id } = req.params;
  const { name, email, department } = req.body;

  const employeeIndex = employees.findIndex(emp => emp.id === parseInt(id));
  if (employeeIndex === -1) {
    return res.status(404).json({ message: 'Employee not found' });
  }

  if (name) employees[employeeIndex].name = name;
  if (email) employees[employeeIndex].email = email;
  if (department) employees[employeeIndex].department = department;

  return res.status(200).json({
    message: 'Employee updated successfully',
    employee: employees[employeeIndex],
  });
};

export const deleteEmployee = (req, res) => {
  const { id } = req.params;
  const index = employees.findIndex(emp => emp.id === parseInt(id));

  if (index === -1) {
    return res.status(404).json({ message: 'Employee not found' });
  }

  employees.splice(index, 1);
  return res.status(200).json({ message: 'Employee deleted successfully' });
};
