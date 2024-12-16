const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  User: {type: String, require: true},
  content: {type: String, require: true},
  likes: {type: Number, default:0},
  createdBy: {type: String, require: true},
  likedBy: [
      {
        type: mongoose.Schema.Types.ObjectId, // Assuming users have unique MongoDB ObjectIds
        ref: 'User', // Reference to a 'User' model (optional, for population)
      },
    ],
});

const columnSchema = new mongoose.Schema({
    name: {type: String, require: true},
    cards: [cardSchema]
});

const boardSchema = new mongoose.Schema({
    name: {type: String, require: true},
    columns: [columnSchema]
});

module.exports = mongoose.model('Board', boardSchema);