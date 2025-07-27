import React from "react";
import Swal from "sweetalert2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";

const TodoItem = ({ todo, onEdit, onDelete }) => {
  const handleDelete = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to delete this TODO?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#b61121",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        onDelete(todo); // or onDelete(todo.id) depending on how your App.jsx handles it
      }
    });
  };

  return (
    <tr>
      <td>{todo.id}</td>
      <td>{todo.title}</td>
      <td>{todo.completed ? "Yes" : "No"}</td>
      <td>
        <button onClick={() => onEdit(todo)} style={{ marginRight: "8px" }}>
          <FontAwesomeIcon icon={faEdit} style={{ color: "blue" }} />
        </button>
        <button onClick={handleDelete}>
          <FontAwesomeIcon icon={faTrash} style={{ color: "crimson" }} />
        </button>
      </td>
    </tr>
  );
};

export default TodoItem;
