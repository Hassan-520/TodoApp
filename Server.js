import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import cors from 'cors';
import TodoRoutes from './routes/Todo_Routes.js'
import connectDB from './config/db.js';
import bodyParser from 'body-parser';
dotenv.config();
connectDB();
const app = express();
const dbPort = process.env.PORT;
const dbMode = process.env.DEV_MODE;
app.use(bodyParser.json());
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.use('/api/v1/todoapp', TodoRoutes);
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
  const PORT = dbPort || 8080;
  app.listen(dbPort, () => {
    console.log(`Server is running on ${dbMode} mode on port ${dbPort}.`);
  });

export default app;