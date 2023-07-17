import { render, screen, fireEvent, waitFor, queryByTestId} from '@testing-library/react';
import Main from './Main'
import axios from 'axios';
jest.mock('axios'); // Mock the axios module
test('Should render todo component',()=>{
   render(<Main/>)
   const todoElement = screen.getByTestId('Todo-1');
   expect(todoElement).toBeInTheDocument();
})
test('should render the Main component with initial state', () => {
    const { queryByTestId, getByTestId } = render(<Main />);
    
    // Assert initial state
    expect(queryByTestId('todo-list')).not.toBeInTheDocument();
    expect(getByTestId('task-input')).toHaveValue('');
    expect(queryByTestId('todo-item')).not.toBeInTheDocument();
});


test('should delete a task when the delete button is clicked', () => {
  const mockTodoLists = [
    { _id: '1', task: 'Task 1', completed: false },
    { _id: '2', task: 'Task 2', completed: false },
    { _id: '3', task: 'Task 3', completed: false },
  ];

  axios.delete.mockResolvedValueOnce({ data: { message: 'Task deleted successfully' } });

  const {  queryByTestId } = render(<Main />);

   waitFor(() => {
    expect(queryByTestId('todo-list')).not.toBeInTheDocument();
  });

   waitFor(() => {
    expect(axios.get).toHaveBeenCalledWith('/api/v1/todoapp/getalllist');
    expect(queryByTestId('todo-list')).toBeInTheDocument();
  });

  axios.delete.mockResolvedValueOnce({ data: { message: 'Task deleted successfully' } });

   waitFor(() => {
    const deleteButtons = queryByTestId('delete-item');
    fireEvent.click(deleteButtons[0]);
  });

   waitFor(() => {
    expect(axios.delete).toHaveBeenCalledWith('/api/v1/todoapp/delete/1');
    expect(queryByTestId('delete-item-1')).not.toBeInTheDocument();
  });
});


test('should fetch and display todo lists when arrow button is clicked', async () => {
  const todoListsData = [
    { _id: '1', task: 'Task 1', completed: false },
    { _id: '2', task: 'Task 2', completed: true },
  ];
  axios.get.mockResolvedValue({ data: { todoLists: todoListsData } });

  const { getByText, queryByTestId } = render(<Main />);

  expect(axios.get).toHaveBeenCalledTimes(1);
  expect(axios.get).toHaveBeenCalledWith('/api/v1/todoapp/Tasks');

  await waitFor(() => {
    const todoItems = queryByTestId('todo-item');
    if (todoItems) {
      // `todoItems` is truthy, meaning the elements are rendered
      expect(todoItems).toBeInTheDocument();
      expect(getByText('Task 1')).toBeInTheDocument();
      expect(getByText('Task 2')).toBeInTheDocument();
    } else {
      // `todoItems` is falsy, meaning the elements are not rendered
      expect(queryByTestId('no-todo-message')).not.toBeInTheDocument();
    }
  });
});


 test('adds a task when Add button is clicked',()=>{
  const { getByTestId, getByText, queryAllByTestId } = render(<Main />);
  const taskInput = getByTestId('task-input');
  const addButton = getByTestId('add-button');
  fireEvent.change(taskInput, { target: { value: 'New Task' } });
  fireEvent.click(addButton);
  expect(axios.post).toHaveBeenCalledTimes(1);
  expect(axios.post).toHaveBeenCalledWith('/api/v1/todoapp/Tasks', { task: 'New Task' });
  waitFor(()=>{
    const todoItems = queryAllByTestId('todo-item');
    expect(todoItems.length).toBe(1);
    expect(getByText('New Task')).toBeInTheDocument();
  })
})
  
  test('marks a task as complete when the radio button is clicked', async () => {
    // Mock axios put method
    axios.put.mockResolvedValueOnce({ data: { completedTime: '2023-06-25T12:00:00' } });

    render(<Main />);
  
    // Call the addTask function to add a new task with the text 'New Task'
    fireEvent.change(screen.getByTestId('task-input'), { target: { value: 'New Task' } });
    fireEvent.click(screen.getByTestId('add-button'));
    screen.findByText('New Task');
    waitFor(()=>{
      const radioButton = screen.queryByTestId('todo-item-radio');
      fireEvent.click(radioButton[0]);
    })
  
    waitFor(() => expect(axios.put).toHaveBeenCalledTimes(1));
    expect(screen.queryByTestId('todo-item')).not.toBeInTheDocument('Completed');
  });
  
  