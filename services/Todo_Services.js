import TodoSchema from '../models/Todo_Schema.js';

export const createTodo = async (task, completed, completedTime, creationTime) => {
  try {
    const newTodo = new TodoSchema({
      task,
      completed,
      completedTime,
      creationTime
    });

    const savedTodo = await newTodo.save();
    return savedTodo;
  } catch (error) {
    throw new Error('Failed to create Todo');
  }
};

export const deleteTodo = async (id) => {
  try {
    const deletedTodo = await TodoSchema.findByIdAndRemove(id);
    return deletedTodo;
  } catch (error) {
    throw new Error('Failed to delete Todo');
  }
};

export const getAllTodos = async () => {
  try {
    const todos = await TodoSchema.find();
    return todos;
  } catch (error) {
    throw new Error('Failed to retrieve Todos');
  }
};

export const updateTodoFields = async (id) => {
  try {
    const todo = await TodoSchema.findById(id);

    if (!todo) {
      throw new Error('Task not found');
    }

    todo.completed = true;
    todo.completedTime = new Date();
    await todo.save();

    return todo.completedTime;
  } catch (error) {
    throw new Error('Failed to update Todo fields');
  }
};
