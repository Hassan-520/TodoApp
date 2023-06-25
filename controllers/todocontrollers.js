import todoschema from "../models/todoschema.js";
export const CreateTodoList = async(req,res)=>{
    const {task, completed,completedTime,creationTime}=req.body;
    try{
        const newTodo = new todoschema({
            task,completed,completedTime,creationTime
        });
       const savedTodo =  await newTodo.save();
       res.status(200).json({
        success:true,
        message:"Successfully Create Todo List",
        savedTodo
       })
        
    }
    catch(error){
        console.log("Error in creating todo list", error);
        res.status(404).json({
            success:false,
            message:"Failed to create Todo List",
            error
        })
    }
}
export const deleteTodoList = async (req, res) => {
    const { id } = req.params;
  
    try {
      const deletedTodo = await todoschema.findByIdAndRemove(id);
      res.status(200).json({
        success: true,
        message: "Successfully deleted Todo List",
        deletedTodo,
      });
    } catch (error) {
      console.log("Error in deleting Todo List", error);
      res.status(404).json({
        success: false,
        message: "Failed to delete Todo List",
        error,
      });
    }
  };
  export const getallTodoList = async (req,res)=>{
    try {
        const todoLists = await todoschema.find();
        res.status(200).json({
          success: true,
          message: "Successfully retrieved Todo Lists",
          todoLists,
        });
      } catch (error) {
        console.log("Error in retrieving Todo Lists", error);
        res.status(404).json({
          success: false,
          message: "Failed to retrieve Todo Lists",
          error,
        });
      }
  }
  export const updatefields = async (req,res)=>{
    try{
        const {id} = req.params;
        const todo = await todoschema.findById(id);
        if (!todo) {
            return res.status(404).json({ success: false, message: 'Task not found' });
        }
        todo.completed = true;
        todo.completedTime = new Date();
        await todo.save();
        res.status(200).json({ 
          success: true, 
          completedTime: todo.completedTime });
    }catch(error)
    {
      console.log("Error in update completed task",error)
      res.status(404).json({
        success :false,
        message:"failed to updated fields",
        error,
      })
    }
  }

  