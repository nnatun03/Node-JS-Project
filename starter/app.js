const express = require('express'); // import express module
const morgan = require('morgan'); // import morgan module

const tourRouter = require('./routes/tourRoutes'); // import tour router
const userRouter = require('./routes/userRoutes'); // import user router

const app = express(); // create express application

// 1) MIDDLEWARES
if (process.env.NODE_ENV === 'development') { // if in development mode
    app.use(morgan('dev')); // use morgan to log request data
}

app.use(express.json()); // middleware to parse JSON data from body
app.use(express.static(`${__dirname}/public`)); // middleware to serve static files

app.use((req,res ,next) => { // middleware to log request time
    req.requestTime = new Date().toISOString();
    next();
});

// 2) ROUTES
app.use('/api/v1/tours', tourRouter); // use tour router
app.use('/api/v1/users', userRouter); // use user router

module.exports = app; // export app for use in server.js