import React, { useState } from 'react';

const TodoList = ({ todos, removeTodo, toggleTodo, editTodo }) => {
  const [editingTodo, setEditingTodo] = useState(null);
  const [editedText, setEditedText] = useState('');

  const startEditing = (id, text) => {
    setEditingTodo(id);
    setEditedText(text);
  };

  const cancelEditing = () => {
    setEditingTodo(null);
    setEditedText('');
  };

  const saveEditing = (id) => {
    // Call the editTodo function with the updated text
    editTodo(id, editedText);
    setEditingTodo(null);
    setEditedText('');
  };

  return (
    <ul className="list-group mb-3">
      {todos.map((todo) => (
        <li key={todo.id} className="list-group-item d-flex align-items-center">
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => toggleTodo(todo.id)}
            className="mr-2"
          />
          {editingTodo === todo.id ? (
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                value={editedText}
                onChange={(e) => setEditedText(e.target.value)}
              />
              <div className="input-group-append">
                <button
                  className="btn btn-outline-success"
                  onClick={() => saveEditing(todo.id)}
                >
                  Save
                </button>
                <button
                  className="btn btn-outline-secondary"
                  onClick={cancelEditing}
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div className="d-flex w-100">
              <span className={todo.completed ? 'text-muted flex-grow-1' : 'flex-grow-1'}>
                {todo.text}
              </span>
              <button
                onClick={() => startEditing(todo.id, todo.text)}
                className="btn btn-outline-secondary btn-sm ml-auto mr-1"
              >
                Edit
              </button>
              <button
                onClick={() => removeTodo(todo.id)}
                className="btn btn-outline-danger btn-sm"
              >
                Remove
              </button>
            </div>
          )}
        </li>
      ))}
    </ul>
  );
};

export default TodoList;
