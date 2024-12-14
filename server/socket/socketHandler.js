const Board = require('../models/board');
const io = require('socket.io');  // Import socket.io

const socketHandler = (socket) => {
  socket.on('add-card', (data) => {
    socket.broadcast.emit('card-added', data);  // Broadcast to other clients
  });

  socket.on('like-card', (data) => {
    socket.broadcast.emit('card-liked', data);
  });

  socket.on('delete-card', (data) => {
    socket.broadcast.emit('card-deleted', data);
  });
};

module.exports = socketHandler;
