import {
  createTodo,
  deleteTodo,
  getAllTodos,
  updateTodoFields
} from '../services/Todo_Services.js';
export const CreateTodoList = async (req, res) => {
  const { task, completed, completedTime, creationTime } = req.body;

  try {
    const savedTodo = await createTodo(task, completed, completedTime, creationTime);

    res.status(200).json({
      success: true,
      message: 'Successfully create Todo List',
      savedTodo
    });
  } catch (error) {
    console.log('Error in creating todo list', error);
    res.status(404).json({
      success: false,
      message: 'Failed to create Todo List',
      error: error.message
    });
  }
};

export const deleteTodoList = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedTodo = await deleteTodo(id);

    res.status(200).json({
      success: true,
      message: 'Successfully deleted Todo List',
      deletedTodo
    });
  } catch (error) {
    console.log('Error in deleting Todo List', error);
    res.status(404).json({
      success: false,
      message: 'Failed to delete Todo List',
      error: error.message
    });
  }
};

export const getallTodoList = async (req, res) => {
  try {
    const todoLists = await getAllTodos();

    res.status(200).json({
      success: true,
      message: 'Successfully retrieved Todo Lists',
      todoLists
    });
  } catch (error) {
    console.log('Error in retrieving Todo Lists', error);
    res.status(404).json({
      success: false,
      message: 'Failed to retrieve Todo Lists',
      error: error.message
    });
  }
};

export const updatefields = async (req, res) => {
  try {
    const { id } = req.params;
    const completedTime = await updateTodoFields(id);

    res.status(200).json({
      success: true,
      completedTime
    });
  } catch (error) {
    console.log('Error in updating completed task', error);
    res.status(404).json({
      success: false,
      message: 'Failed to update fields',
      error: error.message
    });
  }
};