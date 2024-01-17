const express = require('express'); // import express module
const fs = require('fs'); // import file system module
const app = express(); // create express application
const morgan = require('morgan'); // import morgan module

app.use(morgan('dev')); // middleware to log request data
app.use(express.json()); // middleware to parse JSON data from body
app.use((req,res ,next) => { // middleware to log request time
    req.requestTime = new Date().toISOString();
    next();
});


const tours = JSON.parse( // read file and parse JSON data
    fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
    );

const getAllTours = (req, res) => { // create route handler
    res.status(200).json({
        status: 'success',
        results: tours.length, // number of tours chỉ dùng khi get all tours
        data: {
            tours
        }
    });
};   

const getTour = (req, res) => {
    const id = req.params.id * 1; // convert string to number
    const tour = tours.find(el => el.id === id); // find tour by id
    if (!tour) { // if tour not found
        return res.status(404).json({ // return error
            status: 'fail',
            message: 'Invalid ID'
        });
    }
    res.status(200).json({ // if tour found
        status: 'success',
        data: {
            tour
        }
    });
};

const updateTour = (req, res) => {
    // Check if the tour exists
    if (req.params.id * 1 > tours.length) {
        return res.status(404).json({
            status: 'fail',
            message: 'Invalid ID'
        });
    }
    // Send the updated tour data in the response
    res.status(200).json({
        status: 'success',
        data: {
            tour: '<Updated tour here...>'
        }
    });
};

const deleteTour = (req, res) => {
    // Check if the tour exists
    if (req.params.id * 1 > tours.length) {
        return res.status(404).json({
            status: 'fail',
            message: 'Invalid ID'
        });
    }
    // Send the updated tour data in the response
    res.status(204).json({
        status: 'success',
        data: null
    });
};
const createTour = (req, res) => { 
    res.status(201).json({
        status: 'success',
        data: {
            tour: '<New tour here...>'
        }
    });
};

const getAllUsers = (req, res) => { // create route handler
    res.status(500).json({
        status: 'error',
        message: 'This route is not yet defined'
    });
};

const createUser = (req, res) => { 
    res.status(500).json({
        status: 'error',
        message: 'This route is not yet defined'
    });
};

const getUser = (req, res) => {
    res.status(500).json({
        status: 'error',
        message: 'This route is not yet defined'
    });
};

const updateUser = (req, res) => {
    res.status(500).json({
        status: 'error',
        message: 'This route is not yet defined'
    });
};

const deleteUser = (req, res) => {
    res.status(500).json({
        status: 'error',
        message: 'This route is not yet defined'
    });
};
// create route
const tourRouter = express.Router(); // create router
const userRouter = express.Router(); // create router
app.use('/api/v1/tours', tourRouter); // use tour router
app.use('/api/v1/users', userRouter); // use user router

app 
    .route('/')
    .get(getAllTours)
    .post(createTour);

app
    .route('/:id')
    .get(getTour)
    .patch(updateTour)
    .delete(deleteTour);

app
    .route('/')
    .get(getAllUsers)
    .post(createUser);

app
    .route('/:id')
    .get(getUser)
    .patch(updateUser)
    .delete(deleteUser);


const port = 3000;
app.listen(port, () => {
    console.log(`Example app listening on ${port}!...`);
    });