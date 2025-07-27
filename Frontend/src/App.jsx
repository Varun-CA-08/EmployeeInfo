import React, { useState, useEffect } from 'react';
import { getTodos, addTodo, updateTodo, deleteTodo } from './services/todoService';
import Swal from 'sweetalert2';

function App() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState('');
  const [editData, setEditData] = useState(null);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await getTodos();
      if (response.status !== 200) throw new Error();

      const data = response.data.filter((item) => item && item.title?.trim());
      setTodos(data || []);
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops',
        text: error?.response?.data?.message || 'Something went wrong',
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    const todo = {
      title: title.trim(),
      completed: false,
    };

    try {
      let response;

      if (editData) {
        response = await updateTodo({ ...editData, title: todo.title });
      } else {
        response = await addTodo(todo);
      }

      if (response.status !== 200 && response.status !== 201) throw new Error();

      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: `Todo ${editData ? 'updated' : 'added'} successfully!`,
      });

      setTitle('');
      setEditData(null);
      fetchTodos();
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops',
        text: error?.response?.data?.message || 'Something went wrong',
      });
    }
  };

  const handleEdit = (todo) => {
    setEditData(todo);
    setTitle(todo.title);
  };

  const handleDelete = async (todo) => {
    try {
      const response = await deleteTodo(todo.id);
      if (response.status !== 200) throw new Error();

      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Todo deleted successfully!',
      });

      fetchTodos();
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops',
        text: error?.response?.data?.message || 'Something went wrong',
      });
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Add Details</h1>

      <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
        <input
          type="text"
          value={title}
          placeholder="Enter todo title"
          onChange={(e) => setTitle(e.target.value)}
        />
        <button type="submit" style={{ marginLeft: '10px' }}>
          {editData ? 'Update' : 'Add'}
        </button>
      </form>

      <table border="1" cellPadding="10" style={{ borderCollapse: 'collapse', width: '100%' }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Completed</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {todos.length === 0 ? (
            <tr>
              <td colSpan="4" style={{ textAlign: 'center' }}>
                No todos found
              </td>
            </tr>
          ) : (
            todos.map((todo) => (
              <tr key={todo.id}>
                <td>{todo.id}</td>
                <td>{todo.title}</td>
                <td>{todo.completed ? 'Yes' : 'No'}</td>
                <td>
                  <button onClick={() => handleEdit(todo)}>Edit</button>
                  <button
                    onClick={() =>
                      Swal.fire({
                        title: 'Are you sure?',
                        text: 'This will delete the todo.',
                        icon: 'warning',
                        showCancelButton: true,
                        confirmButtonColor: '#3085d6',
                        cancelButtonColor: '#d33',
                        confirmButtonText: 'Yes, delete it!',
                      }).then((result) => {
                        if (result.isConfirmed) handleDelete(todo);
                      })
                    }
                    style={{ marginLeft: '10px' }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default App;
