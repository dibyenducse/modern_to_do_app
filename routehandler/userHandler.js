const express = require('express');
const userSchema = require('../schemas/userSchema');
const mongoose = require('mongoose');
const router = require('./todoHandler');
const User = new mongoose.model('User', userSchema);
const bcrypt = require('bcrypt');

//Sign Up
router.post('/signup', async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        const newUser = User({
            name: req.body.name,
            username: req.body.username,
            password: hashedPassword,
        });
        await newUser.save();
        res.send('Signup was successfully');
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
