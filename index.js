const express = require('express');
const mongoose = require('mongoose');
const todoHandler = require('./routehandler/todoHandler');

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

//default error handler
function errorHandler(err, req, res, next) {
    if (res.headersent) {
        return next(err);
    }
    res.status(500).json({ error: err });
}

app.listen(3000, () => {
    console.log('app listening at port 3000');
});
