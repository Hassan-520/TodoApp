import React, { useState, useEffect } from 'react';
import './Main.css';
import bgimg from '../assets/Background.png';
import TodoService from '../services/TodoService';
import AddTodo from './AddTodo';
import DisplayTodoList from './DisplayTodoList';

const Main = () => {
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

  const addTask = async (newTask) => {
    try {
      const response = await TodoService.createList({ task: newTask });
      setTodoLists([...todoLists, response.data]);
      fetchTodoLists();
    } catch (error) {
      console.error('Error adding task:', error);
    }
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
        <AddTodo onAdd={addTask} />
        <DisplayTodoList
          todoLists={todoLists}
          isLoading={isLoading}
          onMarkAsComplete={markTaskAsComplete}
          onDelete={handleDotClick}
        />
      </form>
    </div>
  );
};

export default Main;
