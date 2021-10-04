/* eslint-disable prettier/prettier */
const express = require('express');
const app = express();
const server = require('http').Server(app);
const cors = require('cors');
const io = require('socket.io')(server, {
  cors: {
    origin: '*',
  },
});

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send({response: 'Server is up and running'});
});

io.on('connection', socket => {
  console.log('socket connected');
  io.emit('welcome', `Welcome to ${PORT}`);
  socket.on('joinRoom', ({roomId, user}) => {
    console.log('user connected :', roomId, user);
  });

  socket.on('emergency', sender => {
    io.emit('emergency', sender);
  });
  socket.on('online', () => {
    console.log('online');
  });

  socket.on('disconnect', () => {});
});

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
