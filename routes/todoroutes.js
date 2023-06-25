import express from 'express';
import {CreateTodoList,deleteTodoList,getallTodoList,updatefields } from '../controllers/todocontrollers.js'
const router = express.Router()
router.post('/create-list',CreateTodoList);
router.delete('/delete-list/:id',deleteTodoList);
router.get('/getalllist',getallTodoList );
router.put('/updatefields/:id',updatefields);
export default router