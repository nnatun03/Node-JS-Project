const express = require('express'); // import express module
const fs = require('fs'); // import file system module
const app = express(); // create express application
const morgan = require('morgan'); // import morgan module

app.user(morgan('dev')); // middleware to log request data
app.use(express.json()); // middleware to parse JSON data from body

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

// create route
app 
    .route('/api/v1/tours')
    .get(getAllTours)
    .post(createTour);

app
    .route('/api/v1/tours/:id')
    .get(getTour)
    .patch(updateTour)
    .delete(deleteTour);


const port = 3000;
app.listen(port, () => {
    console.log(`Example app listening on ${port}!...`);
    });