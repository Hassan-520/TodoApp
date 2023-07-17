import axios from 'axios';
const BASE_URL = '/api/v1/todoapp';

const TodoService = {
    getAllLists: async () => {
        try {
          const response = await axios.get(`${BASE_URL}/Tasks`);
          return response.data;
        } catch (error) {
          throw new Error('Error retrieving Todo Lists', error);
        }
      },
    
      createList: async (newTask) => {
        try {
          const response = await axios.post(`${BASE_URL}/Tasks`, newTask);
          return response.data;
        } catch (error) {
          throw new Error('Error adding task', error);
        }
      },
    
      deleteList: async (itemId) => {
        try {
          const response = await axios.delete(`${BASE_URL}/Tasks/${itemId}`);
          return response.data;
        } catch (error) {
          throw new Error('Error deleting item', error);
        }
      },
    
      updateFields: async (taskId) => {
        try {
          const response = await axios.put(`${BASE_URL}/Tasks/${taskId}`);
          return response.data;
        } catch (error) {
          throw new Error('Error marking task as complete', error);
        }
      }
};
export default TodoService;