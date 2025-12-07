const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

let squares = []; // Shared grid state

app.use(express.static('public')); // Serve your HTML/JS

io.on('connection', socket => {
  console.log('A user connected');

  // Send current grid to new client
  socket.emit('updateGrid', squares);

  // Listen for new squares from clients
  socket.on('addSquare', () => {
    squares.push(1); // just a placeholder
    io.emit('updateGrid', squares); // broadcast to all clients
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

server.listen(3000, () => console.log('Server running on http://localhost:3000'));
