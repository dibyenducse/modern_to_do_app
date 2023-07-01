const express = require('express');
const mongoose = require('mongoose');
const todoHandler = require('./routehandler/todoHandler');
const userHandler = require('./routehandler/userHandler');

//express initialization
const app = express();
app.use(express.json());

//database connection with mongoose
mongoose
    .connect('mongodb://localhost/modern_to_do_app')
    .then(() => {
        console.log('connection sucessfull');
    })
    .catch((err) => console.log(err));

//application routes
app.use('/todo', todoHandler);
app.use('/user', userHandler);

//404 error handler
app.use((req, res, next) => {
    next('Requested url was not found');
});

//default error handler
function errorHandler(err, req, res, next) {
    console.log(err);
    if (res.headersent) {
        return next(err);
    }
    res.status(500).json({ error: err }).send('There was an error');
}

app.listen(3000, () => {
    console.log('app listening at port 3000');
});
