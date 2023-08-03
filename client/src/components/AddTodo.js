import React, { useState } from 'react';

const AddTodo = ({ onAdd }) => {
  const [newTask, setNewTask] = useState('');

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      addTask();
    }
  };

  const handleAddButtonClick = (event) => {
    event.preventDefault();
    addTask();
  };

  const addTask = () => {
    if (newTask.trim() !== '') {
      onAdd(newTask);
      setNewTask('');
    }
  };

  return (
    <div className="d-flex justify-content-center">
      <input
        type="text"
        id="todotextid"
        name="todotext"
        placeholder="To do today"
        value={newTask}
        onChange={(event) => setNewTask(event.target.value)}
        onKeyDown={handleKeyPress}
        data-testid="task-input"
        className="form-control"
      />
      <button className="btn btn-primary" onClick={handleAddButtonClick} data-testid="add-button">
        Add
      </button>
    </div>
  );
};

export default AddTodo;
