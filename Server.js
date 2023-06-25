import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import cors from 'cors';
import todorouters from './routes/todoroutes.js'
import connectDB from './config/db.js';
import bodyParser from 'body-parser';
import {deleteTodoList,getallTodoList,updatefields} from './controllers/todocontrollers.js'
dotenv.config();
connectDB();
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.post('/createTodoList', async (req, res) => {
  const todo = req.body;
  const task = todo.task;

  // create a new todo list
  const newTodo = {
    task,
    completed: false,
    completedTime: null,
    creationTime: new Date(),
  };

  // send the new todo list back to the client
  res.json(newTodo);
});
app.delete('/deleteTodoList/:id', deleteTodoList);
app.get('/getAllTodoLists',getallTodoList)
app.put('/updatefields/:id',updatefields)
app.use('/api/v1/todoapp', todorouters);
app.get('/', (req, res) => {
    res.send({
      message: 'Hello, world!'
    });
  });
  
  // define a catch-all error handler
  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send({
      message: 'Something went wrong!'
    });
  });
  
  // set up the server to listen on the specified port
  const PORT = process.env.PORT || 8080;
  app.listen(PORT, () => {
    console.log(`Server is running on ${process.env.DEV_MODE} mode on port ${PORT}.`);
  });

export default app;