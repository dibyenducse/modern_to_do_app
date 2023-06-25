const express = require('express');
const router = express.Router();
const todoSchema = require('../schemas/todoSchema');
const mongoose = require('mongoose');
const Todo = mongoose.model('Todo', todoSchema);
//Get all the todos
router.get('/', async (req, res) => {});

//Get a todo by id
router.get('/:id', async (req, res) => {});

//post a todo
router.post('/', async (req, res) => {
    const newTodo = new Todo(req.body);
    await newTodo.save();
});

//post multiple todo
router.post('/', async (req, res) => {});

//put todo update todo
router.put('/', async (req, res) => {});

//delete todo
router.delete('/', async (req, res) => {});

module.exports = router;
