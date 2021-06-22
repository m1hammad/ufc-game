const mongoose = require('mongoose');
// optional shortcut to the mongoose.Schema class
const Schema = mongoose.Schema;

const storeSchema = new Schema({
  name: String,
  price: String,
  image: String,
}, {
  timestamps: true
});

// Compile the schema into a model and export it
module.exports = mongoose.model('Store', storeSchema);