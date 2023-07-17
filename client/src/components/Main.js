import React, { useState, useEffect } from 'react';
import './Main.css';
import bgimg from '../assets/Background.png';
import TodoService from '../services/TodoService';
import Loader from './Loader';
import { RiGridFill } from 'react-icons/ri';

const Main = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [todoLists, setTodoLists] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchTodoLists();
  }, []);

  const fetchTodoLists = async () => {
    try {
      setIsLoading(true);
      const response = await TodoService.getAllLists();
      console.log('Response:', response);
      if (response && response.success && response.todoLists) {
        setTodoLists(response.todoLists);
      } else {
        console.log('Invalid response format');
      }
      setIsLoading(false);
    } catch (error) {
      console.log('Error retrieving Todo Lists', error);
    }
  };

  const addTask = async () => {
    try {
      const response = await TodoService.createList({ task: newTask });
      setTasks([...tasks, response.data]);
      setNewTask('');
      fetchTodoLists();
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

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

  const handleDotClick = async (itemId) => {
    try {
      setIsLoading(true);
      const response = await TodoService.deleteList(itemId);
      if (response && response.data && response.data.message) {
        console.log(response.data.message);
      } else {
        console.log('Invalid response format');
      }
      await fetchTodoLists();
      setIsLoading(false);
    } catch (error) {
      console.error('Error deleting item:', error);
      setIsLoading(false);
    }
  };

  const markTaskAsComplete = async (taskId) => {
    try {
      const completionTime = new Date().toLocaleString(); 
      await TodoService.updateFields(taskId, { completedTime: completionTime });
      const updatedTodoLists = todoLists.map((todo) => {
        if (todo._id === taskId) {
          return {
            ...todo,
            completed: true,
            completedTime: completionTime,
          };
        }
        return todo;
      });
      setTodoLists(updatedTodoLists);
    } catch (error) {
      console.error('Error marking task as complete:', error);
    }
  };
    return (
    <div className="container" data-testid="Todo-1">
      <img className="bgimg img-fluid" src={bgimg} alt="BackgroundImg" />
      <form data-testid="task-form">
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
            className="form-control "
          />
          <button className="btn btn-primary " onClick={handleAddButtonClick} data-testid="add-button">
            Add
          </button>
        </div>

        {isLoading ? (
          <Loader />
        ) : (
          <div className="todo-list mt-3">
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
                        onChange={() => markTaskAsComplete(todo._id)}
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
                        onClick={() => handleDotClick(todo._id)}
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
      </form>
    </div>
  );
};

export default Main;
