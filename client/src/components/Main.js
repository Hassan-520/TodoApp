import React, { useState } from 'react';
import './Main.css';
import bgimg from '../assets/Background.png';
import axios from 'axios';
import { RiGridFill } from 'react-icons/ri';
const Main = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [todoLists, setTodoLists] = useState([]);
  const [isListOpen, setIsListOpen] = useState(false); 

  
    const fetchTodoLists = async () => {
      try {
        const response = await axios.get('/api/v1/todoapp/getalllist');
        setTodoLists(response.data.todoLists);
      } catch (error) {
        console.log('Error retrieving Todo Lists', error);
      }
    };

  const addTask = async () => {
    try {
      const response = await axios.post('/api/v1/todoapp/create-list', { task: newTask });
      setTasks([...tasks, response.data]);
      setNewTask('');
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      addTask();
      window.location.reload();

   }
  };
  const handleAddButtonClick = (event) => {
    event.preventDefault();
    addTask();
    window.location.reload();
  };
    const handleDotClick = async (itemId) => {
      try {
        const response = await axios.delete(`/api/v1/todoapp/delete-list/${itemId}`);
        console.log(response.data.message); 
        window.location.reload();
      } catch (error) {
        console.error('Error deleting item:', error);
      }
    }
  
  const markTaskAsComplete = async (taskId) => {
    try {
      const response = await axios.put(`/api/v1/todoapp/updatefields/${taskId}`);
      const updatedTodoLists = todoLists.map((todo) => {
        if (todo._id === taskId) {
          return {
            ...todo,
            completed: true,
            completedTime: response.data.completedTime,
          };
        }
        return todo;
      });
      setTodoLists(updatedTodoLists);
    } catch (error) {
      console.error('Error marking task as complete:', error);
    }
  };
  const handleArrowClick = () => {
    setIsListOpen(!isListOpen); 
    if (!isListOpen) {
      fetchTodoLists();
    } 
  };
  return (
    <div className="container" data-testid="Todo-1" >
      <img className="bgimg" src={bgimg} alt="BackgroundImg" />
      <form data-testid = "task-form">
        <input
          type="text"
          id="todotextid"
          name="todotext"
          placeholder="To do today"
          value={newTask}
          onChange={(event) => setNewTask(event.target.value)}
          onKeyDown={handleKeyPress}
          data-testid="task-input"
        />
        <span className="menu-strip">&#9776;</span>
        <span className="down-arrow" onClick={handleArrowClick} data-testid="arrow-button">&#9660;</span>
        <button className="Addbtn" onClick={handleAddButtonClick } data-testid="add-button">
          Add
        </button>
      
        {isListOpen &&  (
        <div className="todo-list"  >
        {todoLists.length === 0 ? (
          <p>No todo lists found.</p>
        ) : (
          <ul data-testid = "todo-list" >
            {todoLists.map((todo) => (
              <li key={todo._id} className={todo.completed ? 'completed' : ''} data-testid = "todo-item" >
                <div className="task" >{todo.task}</div>
                <div className="status">
                  <label htmlFor={`radio-${todo._id}`}>
                    <input
                      type="radio"
                      checked={todo.completed}
                      onClick={() => markTaskAsComplete(todo._id)}
                      data-testid = "todo-item-radio"
                    />
                  </label>
                </div>
              
                <div className='dots-icon' >
                  <RiGridFill className="custom-grid-icon" onClick={()=>handleDotClick(todo._id)} data-testid="delete-item"/> 
                </div>

              </li>
            ))}
          </ul>
        )}
      </div>)}
      </form>
    
    </div>
  );
};

export default Main;
