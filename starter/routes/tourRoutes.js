const express = require('express');
const tourController = require('./../controllers/tourController'); // import tour controller

const router = express.Router(); // create router

router.param('id', tourController.checkID); // middleware to check id

router 
    .route('/')
    .get(tourController.getAllTours)
    .post(tourController.createTour);

router 
    .route('/:id')
    .get(tourController.getTour)
    .patch(tourController.updateTour)
    .delete(tourController.deleteTour);

module.exports = router; // export router for use in app.js