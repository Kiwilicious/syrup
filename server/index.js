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

io.on('connection', socket => {
    console.log('a user connected', socket.id);
    socket.on('disconnect', () => {
      console.log('user disconnected')
    });

  socket.on('send message', msg => {
    console.log('message: ' + msg)
    io.sockets.emit('chat message', msg);
  })

})
