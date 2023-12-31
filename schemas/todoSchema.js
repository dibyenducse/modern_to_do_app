const mongoose = require('mongoose');

const todoSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },

    description: String,
    status: {
        type: String,
        enum: ['active', 'inactive'],
    },
    date: {
        type: Date,
        default: Date.now,
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    },
});

todoSchema.methods = {
    findActive: function () {
        return mongoose.model('Todo').find({ status: 'active' });
    },
    findActiveCallback: function (cb) {
        return mongoose.model('Todo').find({ status: 'active' }, cb);
    },
};

module.exports = todoSchema;
