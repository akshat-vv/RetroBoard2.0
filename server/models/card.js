const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
    User: {type: String, require: true},
    content: {type: String, require: true},
    likes: {type: Number, default:0},
    likedBy: [
        {
          type: mongoose.Schema.Types.ObjectId, // Assuming users have unique MongoDB ObjectIds
          ref: 'User', // Reference to a 'User' model (optional, for population)
        },
      ],
});

module.exports = mongoose.model('Card', cardSchema);
