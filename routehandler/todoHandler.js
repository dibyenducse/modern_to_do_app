const express = require('express');
const todoSchema = require('../schemas/todoSchema');
const mongoose = require('mongoose');
const Todo = mongoose.model('Todo', todoSchema); //mongoose= Elegant Object Data Modeling

const router = express.Router();
//Get all the todos
router.get('/', async (req, res) => {
    try {
        const result = await Todo.find({ status: 'active' })
            .select({
                _id: 0,
                data: 0,
            })
            .limit(2);
        res.status(200).json({
            result,
            message: 'Todo Found successfully',
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
});

//Get a todo by id
router.get('/:id', async (req, res) => {
    try {
        const result = await Todo.find({ _id: req.params.id });
        res.status(200).json({
            result,
            message: `${req.params.id} Found successfully`,
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
});

//post a todo
router.post('/', async (req, res) => {
    try {
        const newTodo = Todo(req.body);
        await newTodo.save();
        res.send('Data Listed on Database successfully');
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
});

//post multiple todo
router.post('/all', async (req, res) => {
    try {
        await Todo.insertMany(req.body);
        console.log(Todo);
        res.send('Data Listed on Database successfully');
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
});

//put todo update todo
router.put('/:id', async (req, res) => {
    const id = req.params.id;
    const upadateData = req.body;
    try {
        const updateDoc = await Todo.findByIdAndUpdate(id, upadateData, {
            new: true,
        });

        res.status(200).json({
            message: 'Data was updated successfully',
        });

        console.log(updateDoc);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'There are error in server' });
    }
});

//delete todo
router.delete('/', async (req, res) => {});

module.exports = router;
