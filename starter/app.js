const express = require('express'); // import express module
const fs = require('fs'); // import file system module
const app = express(); // create express application
app.use(express.json()); // middleware to parse JSON data from body

const tours = JSON.parse( // read file and parse JSON data
    fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
    );
// GET ALL TOURS
app.get('/api/v1/tours', (req, res) => { // create route handler
    const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`));
    res.status(200).json({
        status: 'success',
        results: tours.length, // number of tours chỉ dùng khi get all tours
        data: {
            tours
        }
    });
});
// GET TOUR BY ID
app.get('/api/v1/tours/:id', (req, res) => { // create route handler
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
});

// UPDATE TOUR
app.patch('/api/v1/tours/:id', (req, res) => {
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
});

// DELETE TOUR
app.delete('/api/v1/tours/:id', (req, res) => {
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
});

// CREATE NEW TOUR
app.post('/api/v1/tours', (req, res) => { // create route handler
    const newId = tours[tours.length - 1].id + 1; // create new id
    const newTour = Object.assign({ id: newId }, req.body); // create new tour

    tours.push(newTour); // add new tour to tours array
    fs.writeFile( // write new tours array to file
        `${__dirname}/dev-data/data/tours-simple.json`,
        JSON.stringify(tours),
        err => {
            res.status(201).json({
                status: 'success',
                data: {
                    tour: newTour
                }
            });
        }
    );
    res.send('Done');
});   

const port = 3000;
app.listen(port, () => {
    console.log(`Example app listening on ${port}!...`);
    });