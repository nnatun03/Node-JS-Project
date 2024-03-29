/* eslint-disable prettier/prettier */
const mongoose = require('mongoose');

const tourSchema = new mongoose.Schema({
    name: {
      type: String,
      required: [true, 'A tour must have a name!'],
      unique: true,
    },
    duration: {
      type: Number,
      required: [true, 'A tour must have a duration!'],
    },
    MaxgroupSize: {
      type: Number,
      required: [true, 'A tour must have a group size!'],
    },
    difficulty: {
      type: String,
      required: [true, 'A tour must have a difficulty!'],
    },
    ratingAverage: {
      type: Number,
      default: 4.5,
    },
    ratingQuantity: {
      type: Number,
      default: 0,
    },
    price: {
      type: Number,
      required: [true, 'A tour must have a price!'],
    },
  });

const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;