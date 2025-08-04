import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

import {
  getEmployees,
  getEmployeeById,
  addEmployee,
  updateEmployee,
  deleteEmployee
} from './services/employeeService';

import EmployeeTable from './components/EmployeeTable';
import EmployeeSearch from './components/EmployeeSearch';

import './App.css'; // ✅ make sure this file exists and contains your original styles

function Employee() {
  const [formData, setFormData] = useState({ name: '', email: '', department: '' });
  const [employees, setEmployees] = useState([]);
  const [editData, setEditData] = useState(null);
  const [searchId, setSearchId] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await getEmployees();
      const data = response.data.filter(emp => emp && emp.name?.trim());
      setEmployees(data);
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops',
        text: error?.response?.data?.message || 'Something went wrong',
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, department } = formData;

    if (!name || !email || !department) {
      return Swal.fire({
        icon: 'warning',
        title: 'Validation Error',
        text: 'All fields are required',
      });
    }

    try {
      const response = editData
        ? await updateEmployee(editData.id, formData)
        : await addEmployee(formData);

      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: `Employee ${editData ? 'updated' : 'added'} successfully!`,
      });

      setFormData({ name: '', email: '', department: '' });
      setEditData(null);
      fetchEmployees();
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops',
        text: error?.response?.data?.message || 'Something went wrong',
      });
    }
  };

  const handleEdit = (emp) => {
    setEditData(emp);
    setFormData({
      name: emp.name,
      email: emp.email,
      department: emp.department,
    });
  };

  const handleDelete = async (emp) => {
    try {
      await deleteEmployee(emp.id);
      Swal.fire({
        icon: 'success',
        title: 'Deleted',
        text: 'Employee deleted successfully!',
      });
      if (editData?.id === emp.id) {
        setEditData(null);
        setFormData({ name: '', email: '', department: '' });
      }
      fetchEmployees();
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops',
        text: error?.response?.data?.message || 'Something went wrong',
      });
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchId.trim()) return;
    setIsSearching(true);
    try {
      const response = await getEmployeeById(searchId);
      setEmployees([response.data]);
    } catch {
      setEmployees([]);
      Swal.fire({
        icon: 'info',
        title: 'Not Found',
        text: `No employee found with ID ${searchId}`,
      });
    }
  };

  const handleClearSearch = () => {
    setSearchId('');
    setIsSearching(false);
    fetchEmployees();
  };

  return (
    <div className="container">
      <h2 className="header">Employee Profile</h2>

      <form onSubmit={handleSubmit}>
        {['name', 'email', 'department'].map((field) => (
          <div className="form-row" key={field}>
            <label htmlFor={field} className="label">
              {field.charAt(0).toUpperCase() + field.slice(1)}
            </label>
            <input
              type={field === 'email' ? 'email' : 'text'}
              id={field}
              name={field}
              placeholder={`Enter your ${field}`}
              value={formData[field]}
              onChange={handleChange}
              className="input"
              required
            />
          </div>
        ))}
        <button type="submit" className="button">
          {editData ? 'Update Profile' : 'Submit Profile'}
        </button>
        {editData && (
          <button
            type="button"
            className="button"
            style={{ backgroundColor: '#95a5a6', color: '#fff', marginLeft: '10px' }}
            onClick={() => {
              setFormData({ name: '', email: '', department: '' });
              setEditData(null);
            }}
          >
            Cancel
          </button>
        )}
      </form>

      <EmployeeSearch
        searchId={searchId}
        onChange={(e) => setSearchId(e.target.value)}
        onSearch={handleSearch}
        onClear={handleClearSearch}
        isSearching={isSearching}
      />

      {employees.length > 0 && (
        <div className="employee-table" style={{ marginTop: '50px', width: '100%' }}>
          <h4>Employee List</h4>
          <EmployeeTable
            employees={employees}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          />
        </div>
      )}
    </div>
  );
}


export default Employee;
