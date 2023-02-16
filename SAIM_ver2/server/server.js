const express = require('express');
// const http = require('http');

const app = express();
const cors = require('cors')
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const myFirstSecret = process.env.FIRST_SECRET_KEY;
// const bodyParser = require('body-parser');
const http = require('http');
const port = 8000;
const server = app.listen(port, () => console.log("Listening on port", port));
// const { WebSocketServer } = require('ws');
// const ws = new WebSocketServer({ noServer: true });
// server.on('upgrade', function (request, socket, head) {
//   ws.handleUpgrade(request, socket, head, function (ws) {
//      ws.emit('connection', ws, request);
//   })
// })
// const { Server } = require("socket.io");
const socketio = require('socket.io')
require('./config/mongoose.config')

// app.use(cookieParser());
// Change the app.use(cors()) to the one below
// app.use(cors({credentials: true, origin: 'http://localhost:3000'})); 
// app.use(bodyParser.json());       // to support JSON-encoded bodies
// app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
//   extended: false
// }));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

require("./routes/awayMessage.routes")(app);
const UserRoutes = require('./routes/user.routes')
UserRoutes(app);

const io = socketio(server,{
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
        allowedHeaders: ['*'],
        credentials: true
    }
})
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

  socket.on('chat message', (msg) => {
    console.log('message: ' + msg);
    io.emit('chat message', msg);
console.log("Message:", msg )
  });
});

// server.listen(3001, () => {
//   console.log('listening on *:3001');
// });