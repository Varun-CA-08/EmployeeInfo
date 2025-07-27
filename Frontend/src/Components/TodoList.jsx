import React from "react";
import TodoItem from "./TodoItem";

const TodoList = ({ todos, onEdit, onDelete }) => {
  return (
    <table border="1" style={{ width: "100%", borderCollapse: "collapse" }}>
      <thead>
        <tr>
          <th>ID</th>
          <th>Title</th>
          <th>Completed</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </tbody>
    </table>
  );
};

export default TodoList;
