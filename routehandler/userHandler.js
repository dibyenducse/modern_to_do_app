const express = require('express');
const userSchema = require('../schemas/userSchema');
const mongoose = require('mongoose');
const router = express.Router();
const User = new mongoose.model('User', userSchema);
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

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
        res.status(200).json({ message: 'Signup was successfully' });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
});

//Login
router.post('/login', async (req, res) => {
    try {
        const users = await User.find({ username: req.body.username });

        if (users && users.length > 0) {
            for (const user of users) {
                const isValidPassword = await bcrypt.compare(
                    req.body.password,
                    user.password
                );

                if (isValidPassword) {
                    // Generate token
                    const token = jwt.sign(
                        {
                            username: user.username,
                            userId: user._id,
                        },
                        // process.env.JWT_SECRET
                        '144'
                    );
                    res.status(200).json({
                        access_token: token,
                        message: 'Logged in Successfully',
                    });
                    return; // Exit the function after successful login
                }
            }
            // If no matching password is found
            res.status(401).json({
                error: 'Authentication Failed',
            });
        } else {
            // If no user is found with the given username
            res.status(401).json({
                error: 'Authentication Failed',
            });
        }
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
