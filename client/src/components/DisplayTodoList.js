import React from 'react';
import { RiGridFill } from 'react-icons/ri';
import Loader from './Loader';

const DisplayTodoList = ({ todoLists, isLoading, onMarkAsComplete, onDelete }) => {
  return (
    <div className="todo-list mt-3">
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          {todoLists.length === 0 ? (
            <p>No todo lists found.</p>
          ) : (
            <ul data-testid="todo-list" className="list-group">
              {todoLists.map((todo) => (
                <li
                  key={todo._id}
                  className={`list-group-item ${todo.completed ? 'completed' : ''}`}
                  data-testid="todo-item"
                >
                  <div className="d-flex align-items-center">
                    <div className="form-check">
                      <input
                        type="radio"
                        checked={todo.completed}
                        onChange={() => onMarkAsComplete(todo._id)}
                        data-testid="todo-item-radio"
                        className={`form-check-input ${todo.completed ? 'custom-radio-highlight' : ''}`}
                        id={`radio-${todo._id}`}
                      />
                      <label
                        className={`form-check-label ${todo.completed ? 'completed-task' : ''}`}
                        htmlFor={`radio-${todo._id}`}
                      >
                        {todo.task}
                      </label>
                    </div>
                    <div className="ms-auto">
                      <RiGridFill
                        className="custom-grid-icon"
                        onClick={() => onDelete(todo._id)}
                        data-testid="delete-item"
                      />
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default DisplayTodoList;
