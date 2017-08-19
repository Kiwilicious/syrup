const express = require('express');
const parser = require('body-parser');
const morgan = require('morgan');
const db = require('../db');
const model = require('../db/models/model');
const routes = require('./routes/routes');
const path = require('path');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const cors = require('cors');

const PORT = process.env.PORT || 8080;


app.use(parser.json());
app.use(parser.urlencoded( {extended: true }));
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, '../static')));

app.use(cors());

app.use('/api', routes);
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../static/index.html'))
});

// socket.io
server.listen(PORT, err => {
  if (err) {
    console.log(err)
  } else {
    console.log(`Successfully connected to PORT ${PORT}`)
  }
});

// io.listen(PORT);
// console.log('socket is listening on port', PORT);

io.on('connection', socket => {
    console.log('a user connected', socket.id);
    socket.on('disconnect', () => {
      console.log('user disconnected')
    });

  socket.on('send message', msg => {
    console.log('message: ' + msg)
    io.sockets.emit('chat message', msg);
  })

  socket.on('new-match', function(data) {
    console.log('setting match notification to true');
    socket.emit('newMatch', {data: 'data'});
  })

  socket.on('new-message', function(data) {
    console.log('setting message notification to true');
    socket.emit('newMessage', {data: 'data'});
  })

  socket.on('new-videochat', function(data) {
    console.log('setting video chat notification to true');
    socket.emit('newVideoChat', {data: 'data'});
  })

  socket.on('match-viewed', function(data) {
    console.log('setting match notification to false');
    socket.emit('matchViewed', {data: 'data'});
  })

  socket.on('message-viewed', function(data) {
    console.log('setting message notification to false');
    socket.emit('messageViewed', {data: 'data'});
  })

  socket.on('videochat-viewed', function(data) {
    console.log('setting video chat notification to false');
    socket.emit('videoChatViewed', {data: 'data'});
  })

})

