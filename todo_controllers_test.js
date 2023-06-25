import { CreateTodoList } from '../Cowlar Design and Studio Task/controllers/todocontrollers.js';
import { updatefields } from '../Cowlar Design and Studio Task/controllers/todocontrollers.js';
import { expect } from 'chai';
import supertest from 'supertest';
import app from '../Cowlar Design and Studio Task/Server.js';
import todoschema from '../Cowlar Design and Studio Task/models/todoschema.js';
import sinon from 'sinon'; 


describe('CreateTodoList', () => {
  it('should create a new todo list', async () => {
    const todo = {
      task: 'Buy groceries',
      completed: false,
      completedTime: null,
      creationTime: new Date().getTime(),
    };

    const response = await supertest(app)
      .post('/createTodoList')
      .send(todo);

    expect(response.status).to.equal(200);
    expect(response.body).to.have.property('task');
    expect(response.body.task).to.equal('Buy groceries');
    expect(response.body).to.have.property('completed');
    expect(response.body.completed).to.be.false;
    expect(response.body).to.have.property('completedTime');
    expect(response.body.completedTime).to.be.null;

    const creationTime = new Date().getTime();
    const nowDate = new Date();
    const creationTimeRange = nowDate - 1000;
    const creationTimeRange2 = nowDate + 1000;

    const creationTimeNumber = Date.parse(response.body.creationTime);

    expect(creationTimeNumber).to.be.closeTo(creationTime, 1000);
  });



});

describe('DeleteTodoList', () => {
    it('should delete a todo list', async () => {
      const todo = new todoschema({
        task: 'Test Todo',
        completed: false,
        completedTime: null,
        creationTime: new Date().getTime(),
      });
  
      const savedTodo = await todo.save();
      const todoId = savedTodo._id;
  
      const response = await supertest(app)
        .delete(`/deleteTodoList/${todoId}`);
  
      expect(response.status).to.equal(200);
      expect(response.body).to.have.property('success');
      expect(response.body.success).to.be.true;
      expect(response.body).to.have.property('message');
      expect(response.body.message).to.equal('Successfully deleted Todo List');
      expect(response.body).to.have.property('deletedTodo');
      expect(response.body.deletedTodo).to.have.property('task');
      expect(response.body.deletedTodo.task).to.equal('Test Todo');
  
      // Ensure the todo is actually deleted from the database
      const deletedTodo = await todoschema.findById(todoId);
      expect(deletedTodo).to.be.null;
    });
  
   
  });
  
  describe('getallTodoList', () => {
    beforeEach(() => {
      todoschema.deleteMany({});
    });
  
    it('should retrieve all todo lists', async () => {
      const todo1 = new todoschema({
        task: 'Todo 1',
        completed: false,
        completedTime: null,
        creationTime: new Date().getTime(),
      });
  
      const todo2 = new todoschema({
        task: 'Todo 2',
        completed: true,
        completedTime: new Date().getTime(),
        creationTime: new Date().getTime(),
      });
  
      await todo1.save();
      await todo2.save();
  
      const stub = sinon.stub(todoschema, 'find');
      stub.returns([todo1, todo2]);
  
      const response = await supertest(app).get('/getAllTodoLists');
  
      expect(response.status).to.equal(200);
      expect(response.body).to.have.property('success');
      expect(response.body.success).to.be.true;
      expect(response.body).to.have.property('message');
      expect(response.body.message).to.equal('Successfully retrieved Todo Lists');
      expect(response.body).to.have.property('todoLists');
      expect(response.body.todoLists).to.be.an('array');
      expect(response.body.todoLists.length).to.equal(2);
      expect(response.body.todoLists[0]).to.have.property('task');
      expect(response.body.todoLists[0].task).to.equal('Todo 1');
      expect(response.body.todoLists[1]).to.have.property('task');
      expect(response.body.todoLists[1].task).to.equal('Todo 2');
  
      stub.restore();
    });

      
      
  });





  describe('updatefields', () => {
    it('should update fields and return completedTime if task is found', async () => {
        // Create a mock todo object
        const mockTodo = new todoschema({
          _id: 'mockTodoId',
          completed: false,
          completedTime: null,
        });
    
        // Stub the findById method of todoschema
        sinon.stub(todoschema, 'findById').resolves(mockTodo);
    
        // Stub the save method of the mockTodo object
        sinon.stub(mockTodo, 'save').resolves(mockTodo);
    
        // Create mock request and response objects
        const req = {
          params: {
            id: 'mockTodoId',
          },
        };
        const res = {
          status: sinon.stub().returnsThis(),
          json: sinon.stub(),
        };
    
        // Call the updatefields function
        await updatefields(req, res);
    
        // Assert the behavior and response
        sinon.assert.calledOnce(todoschema.findById);
        sinon.assert.calledOnce(mockTodo.save);
        sinon.assert.calledOnce(res.status);
        sinon.assert.calledWith(res.json, {
          success: true,
          completedTime: mockTodo.completedTime,
        });
        
    
        // Restore the stubbed methods
        todoschema.findById.restore();
        mockTodo.save.restore();
      });
      it('should return error if task is not found', async () => {
        // Mock the findById method of todoschema to return null
        sinon.stub(todoschema, 'findById').resolves(null);
    
        // Create mock request and response objects
        const req = {
          params: {
            id: 'nonExistentTodoId',
          },
        };
        const res = {
          status: sinon.stub().returnsThis(),
          json: sinon.stub(),
        };
    
        // Call the updatefields function
        await updatefields(req, res);
    
        // Assert the behavior and response
        sinon.assert.calledOnce(todoschema.findById);
        sinon.assert.calledOnce(res.status);
        sinon.assert.calledWith(res.status, 404);
        sinon.assert.calledWith(res.json, {
            success: false,
            message: 'Task not found',
          });

        todoschema.findById.restore();
      });


      
    
  });