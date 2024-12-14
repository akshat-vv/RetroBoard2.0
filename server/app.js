const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const boardRoutes = require('./routes/boardRoutes');
const cardRoutes = require('./routes/cardRoutes');
const authRoutes = require('./routes/authRoutes');
const socketHandler = require('./socket/socketHandler');
const http = require('http');

const app = express();
const server = http.createServer(app);
const io = require('socket.io')(server);

app.use(express.json());
app.use('/api/boards', boardRoutes);
app.use('/api/cards', cardRoutes);
app.use('/api/users', authRoutes)

io.on('connection', socketHandler);

// Database connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Database connected'))
  .catch((err) => console.log(err));

module.exports = { app, server };
