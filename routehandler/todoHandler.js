const express = require('express');
const todoSchema = require('../schemas/todoSchema');
const mongoose = require('mongoose');
const Todo = mongoose.model('Todo', todoSchema); //mongoose= Elegant Object Data Modeling

const router = express.Router();
//Get all the todos
router.get('/', async (req, res) => {
    await Todo.find({ status: 'active' }, (err) => {
        if (err) {
            res.status(500).json({
                error: 'There was an error',
            });
        } else {
            res.status(200).json({
                message: 'Todo inserted successfully',
            });
        }
    });
});

//Get a todo by id
router.get('/:id', async (req, res) => {});

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
    await Todo.updateOne(
        { _id: req.params.id },
        {
            $set: {
                status: 'active',
            },
        },
        (error, writeOpResult) => {
            if (error) {
                res.status(500).json({ error: 'There are error in server' });
            } else {
                res.status(200).json({
                    message: 'Data was updated successfully',
                });
            }
        }
    );
});

//delete todo
router.delete('/', async (req, res) => {});

module.exports = router;
