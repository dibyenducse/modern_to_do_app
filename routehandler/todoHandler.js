const express = require('express');
const todoSchema = require('../schemas/todoSchema');
const userSchema = require('../schemas/userSchema');
const mongoose = require('mongoose');
const Todo = mongoose.model('Todo', todoSchema); //mongoose= Elegant Object Data Modeling
const User = mongoose.model('User', userSchema);
const checkLogin = require('../middlewares/checkLogin');

const router = express.Router();

//Get all the todos
router.get('/', checkLogin, async (req, res) => {
    console.log(req.username);
    console.log(req.userId);
    try {
        const result = await Todo.find({ status: 'active' })
            .populate('user', 'name username')
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

//Get active Todos
router.get('/active', checkLogin, async (req, res) => {
    try {
        const todo = new Todo();
        const data = await todo.findActive();
        res.status(200).json({ data });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

//Get a todo by id
router.get('/:id', checkLogin, async (req, res) => {
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
router.post('/', checkLogin, async (req, res) => {
    try {
        const newTodo = Todo({ ...req.body, user: req.userId });
        const todo = await newTodo.save();
        await User.updateOne(
            {
                _id: req.userId,
            },
            {
                $push: {
                    todos: todo._id,
                },
            }
        );
        res.status(200).json({
            message: 'Todo was inserted successfully',
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
});

//post multiple todo
router.post('/all', checkLogin, async (req, res) => {
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
router.put('/:id', checkLogin, async (req, res) => {
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
router.delete('/:id', checkLogin, async (req, res) => {
    const id = req.params.id;
    try {
        const deletedDoc = await Todo.findByIdAndRemove(id);
        console.log('Deleted document:', deletedDoc);
        res.send('Deletion successful');
    } catch (error) {
        console.error('Error deleting data', error);
        res.status(500).send('An error occurred while deleting');
    }
});

module.exports = router;
