const mongoose = require('mongoose');
// optional shortcut to the mongoose.Schema class
const Schema = mongoose.Schema;

const productSchema = new Schema({
  image: String,
}, {
  timestamps: true
});

const fighterSchema = new Schema({
  name: String,
  weight: String,
  age: Number,
  description: String, 
  image: String,
  record: String,
  isChampion: Boolean,
  products: [productSchema],
}, {
  timestamps: true
});

// Compile the schema into a model and export it
module.exports = mongoose.model('Fighter', fighterSchema);