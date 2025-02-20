// server.js
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Serve static files (for the front-end)
app.use(express.static('public'));

// Handle WebSocket connections
io.on('connection', (socket) => {
  console.log('A user connected');

  // Relay audio streams between clients
  socket.on('audio-stream', (data) => {
    console.log(data)
    // socket.broadcast.emit('audio-stream', data);  // Send to other clients
    socket.emit('audio-stream', data);  // Send to other clients
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

// Start the server
server.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
