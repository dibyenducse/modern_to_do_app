const express = require('express');
const todoSchema = require('../schemas/todoSchema');
const mongoose = require('mongoose');
const Todo = new mongoose.model('Todo', todoSchema); //mongoose= Elegant Object Data Modeling

const router = express.Router();
//Get all the todos
router.get('/', async (req, res) => {});

//Get a todo by id
router.get('/:id', async (req, res) => {});

//post a todo
router.post('/', async (req, res) => {
    const newTodo = new Todo(req.body);
    await newTodo.save();
    res.send('Data Listed on Database successfully');
});

//post multiple todo
router.post('/all', async (req, res) => {
    await Todo.insertMany(req.body);
    res.send('Data Listed on Database successfully');
});

//put todo update todo
router.put('/', async (req, res) => {});

//delete todo
router.delete('/', async (req, res) => {});

module.exports = router;
