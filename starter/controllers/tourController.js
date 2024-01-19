const fs = require('fs'); // import file system module

const tours = JSON.parse( // read file and parse JSON data
    fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
    );

exports.checkID = (req, res, next, val) => { // middleware to check id
    console.log(`Tour id is: ${val}`);
    if (req.params.id * 1 > tours.length) { // if id is invalid
        return res.status(404).json({ // return error
            status: 'fail',
            message: 'Invalid ID'
        });
    }
    next(); // if id is valid, call next middleware
};

exports.checkBody = (req, res, next) => {
    if (!req.body.name || !req.body.price) { // if name or price is missing
        return res.status(400).json({ // return error
            status: 'fail',
            message: 'Missing name or price'
        });
    }
    next(); // if name and price are provided, call next middleware
}

exports.getAllTours = (req, res) => { // create route handler
    res.status(200).json({
        status: 'success',
        results: tours.length, // number of tours chỉ dùng khi get all tours
        data: {
            tours
        }
    });
};   

exports.getTour = (req, res) => {
    const id = req.params.id * 1; // convert id to number
    const tour = tours.find(el => el.id === id); // find tour with given id
    res.status(200).json({ // if tour found
        status: 'success',
        data: {
            tour
        }
    });
};

exports.updateTour = (req, res) => {
    // Send the updated tour data in the response
    res.status(200).json({
        status: 'success',
        data: {
            tour: '<Updated tour here...>'
        }
    });
};

exports.deleteTour = (req, res) => {
    // Send the updated tour data in the response
    res.status(204).json({
        status: 'success',
        data: null
    });
};
exports.createTour = (req, res) => { 
    res.status(201).json({
        status: 'success',
        data: {
            tour: '<New tour here...>'
        }
    });
};
