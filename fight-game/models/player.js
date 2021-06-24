const mongoose = require('mongoose');
// optional shortcut to the mongoose.Schema class
const Schema = mongoose.Schema;

const playerSchema = new Schema({
    name: String,
    email: String,
    googleId: String,
}, {
    timestamps: true
});

// Compile the schema into a model and export it
module.exports = mongoose.model('Player', playerSchema);