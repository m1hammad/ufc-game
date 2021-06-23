const mongoose = require('mongoose');
// optional shortcut to the mongoose.Schema class
const Schema = mongoose.Schema;

const eventSchema = new Schema({
  redCorner: [Object],
  blueCorner: [Object],
  winner: [Object],
}, {
  timestamps: true
});

// Compile the schema into a model and export it
module.exports = mongoose.model('Event', eventSchema);