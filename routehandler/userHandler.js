const express = require('express');
const userSchema = require('../schemas/userSchema');
const mongoose = require('mongoose');
const router = require('./todoHandler');
const User = new mongoose.model('User', userSchema);
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv =
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

//Login
router.post('/login', async (req, res) => {
    try {
        const user = await User.find({ username: req.body.username });
        const isValidPassword = await bcrypt.compare(
            req.body.password,
            user[0].password
        );
        if (isValidPassword) {
            //generate token
            const token = jwt.sign(
                {
                    username: user[0].username,
                    userId: user[0]._id,
                },
                process.env.JWT_SECRET,
                { expireIn: '1h' }
            );
            res.status(200).json({
                access_token: token,
                message: 'Logged in Successfully',
            });
        } else {
            console.log('Authentication Failed');
        }
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
