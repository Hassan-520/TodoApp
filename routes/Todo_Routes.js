import express from 'express';
import {CreateTodoList,deleteTodoList,getallTodoList,updatefields } from '../controllers/Todo_Controllers.js'
const router = express.Router()
router.post('/Tasks',CreateTodoList);
router.delete('/Tasks/:id',deleteTodoList);
router.get('/Tasks',getallTodoList );
router.put('/Tasks/:id',updatefields);
export default router