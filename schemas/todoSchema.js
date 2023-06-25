const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },

    description: String,
    status: {
        type: String,
        enum: ['active', 'inactive'],
    },
    data: {
        type: Date,
        default: Date.now,
    },
});

module.exports = todoSchema;
