const fs = require('fs'); // import file system module

const tours = JSON.parse( // read file and parse JSON data
    fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
    );

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

exports.updateTour = (req, res) => {
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

exports.deleteTour = (req, res) => {
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
exports.createTour = (req, res) => { 
    res.status(201).json({
        status: 'success',
        data: {
            tour: '<New tour here...>'
        }
    });
};
