const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const http = require('http');
const server = http.createServer(app);
const Msg = require('./models/messages.model')
const mongoose = require('mongoose');
const socketio = require('socket.io')

const {Server} = require("socket.io");
const mongoDB = "mongodb+srv://mtvdoan:I10v3413x@cluster0.havkg6w.mongodb.net/?retryWrites=true&w=majority";
const dbConnect = require("./config/dbConnect");

const cors = require('cors');
const Port = 8000;
require('dotenv').config();
app.use(cookieParser());
dbConnect();

const chatFunctionsPort = 3001;
// const io = new Server(server); taken out of original
app.use(cors());
const io = socketio(server, {
cors: {
origin: "http://localhost:3000",
methods: ["GET", "POST"],
allowedHeaders: ['*'],
credentials: true,
},
});

app.use(express.json());
app.use(express.urlencoded({extended: true}));
require('./config/dbConnect');

require('./routes/user.routes')(app);

app.get('/', (req, res) => {
res.sendFile(__dirname + '../client/src/components/Chat.jsx');
});

io.on('connection', (socket) => {
console.log('New client connected');
let timeout;
socket.on('typing', (username) => {
clearTimeout(timeout);
socket.broadcast.emit('typing', username);
timeout = setTimeout(() => {
socket.broadcast.emit('typing', '');
}, 1000);
});
socket.on('chat message', (message) => {
io.emit('chat message', message);
});
socket.on('disconnect', () => {
console.log('Client disconnected');
});
});

server.listen(chatFunctionsPort, () => {
console.log(S`erver started on port ${chatFunctionsPort}`);
});