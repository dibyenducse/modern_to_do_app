const express = require('express')

//express initialization
const app = express();
app.use(express.json())

//application routes



//default error handler
function errorHandler(err, req, res, next) {
    if (res.headersent) {
        return next (err)
    }
    res.status(500).json({ error: err })
}
