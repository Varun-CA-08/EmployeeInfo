import {Employee} from '../models/Employee.js';

// Add employee
// export const addEmployee = async (req, res) => {
//   const { name, email, department } = req.body;

//   if (!name || !email || !department) {
//     return res.status(400).json({ message: 'Name, email, and department are required.' });
//   }

//   try {
//     const newEmployee = new Employee({ name, email, department });
//     await newEmployee.save();

//     return res.status(201).json({
//       message: 'Employee added successfully!',
//       employee: {
//         id: newEmployee._id,
//         name: newEmployee.name,
//         email: newEmployee.email,
//         department: newEmployee.department
//       }
//     });
//   } catch (error) {
//     console.log("Error adding employee:", error);
//     return res.status(500).json({ message: 'Error adding employee', error: error.message });
//   }
// };

export const addEmployee = async (req, res) => {
  const { name, email, department } = req.body;

  if (!name || !email || !department) {
    return res.status(400).json({ message: 'Name, email, and department are required.' });
  }

  try {
    // Check if an employee with the same email already exists
    const existingEmployee = await Employee.findOne({ email });

    if (existingEmployee) {
      return res.status(409).json({ message: 'An employee with this email already exists.' });
    }

    const newEmployee = new Employee({ name, email, department });
    await newEmployee.save();

    return res.status(201).json({
      message: 'Employee added successfully!',
      employee: {
        id: newEmployee._id,
        name: newEmployee.name,
        email: newEmployee.email,
        department: newEmployee.department
      }
    });
  } catch (error) {
    console.error("Error adding employee:", error);
    return res.status(500).json({ message: 'Error adding employee', error: error.message });
  }
};


// Get all employees
export const getEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();
    const formatted = employees.map(emp => ({
      id: emp._id,
      name: emp.name,
      email: emp.email,
      department: emp.department
    }));
    return res.status(200).json(formatted);
  } catch (error) {
    return res.status(500).json({ message: 'Error fetching employees', error: error.message });
  }
};

// Get employee by ID
export const getEmployeeById = async (req, res) => {
  const { id } = req.params;
  try {
    const employee = await Employee.findById(id);
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    return res.status(200).json({
      id: employee._id,
      name: employee.name,
      email: employee.email,
      department: employee.department
    });
  } catch (error) {
    return res.status(500).json({ message: 'Error fetching employee', error: error.message });
  }
};

// Update employee
export const updateEmployee = async (req, res) => {
  const { id } = req.params;
  const { name, email, department } = req.body;

  try {
    const updatedEmployee = await Employee.findByIdAndUpdate(
      id,
      { name, email, department },
      { new: true }
    );

    if (!updatedEmployee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    return res.status(200).json({
      message: 'Employee updated successfully',
      employee: {
        id: updatedEmployee._id,
        name: updatedEmployee.name,
        email: updatedEmployee.email,
        department: updatedEmployee.department
      }
    });
  } catch (error) {
    return res.status(500).json({ message: 'Error updating employee', error: error.message });
  }
};

// Delete employee
export const deleteEmployee = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedEmployee = await Employee.findByIdAndDelete(id);
    if (!deletedEmployee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    return res.status(200).json({ message: 'Employee deleted successfully' });
  } catch (error) {
    return res.status(500).json({ message: 'Error deleting employee', error: error.message });
  }
};
