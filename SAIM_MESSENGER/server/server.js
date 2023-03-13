const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors')
const socketio = require('socket.io')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
const app = express();
const port = 8000;
// const myFirstSecret = process.env.FIRST_SECRET_KEY;
const http = require('http');
require('dotenv').config(); 

app.use(cookieParser());
app.use(cors({credentials: true, origin: 'http://localhost:3000'})); 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

require('./config/mongoose.config')
require("./routes/awayMessage.routes")(app);
const UserRoutes = require('./routes/user.routes')
const RoomRoutes = require('./routes/rooms.routes');

RoomRoutes(app);
UserRoutes(app);

const server = app.listen(port, () => console.log("Listening on port", port));

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

console.log(JSON.stringify(socketio))
io.on("connection", (socket) => {
    console.log(" server io ...on")
    console.log("Socket:", socket.id, "connected to the server");
    console.log(`Message sent from ${socket.id}: ${socket}`);
    socket.on("send_message", (data) => {
        io.emit("message_received", data)
        console.log("io:", io);
        console.log("emit:", emit);
    })
    socket.on("join_room", (data) => {
        console.log("Joined room:", data);
        socket.join(data)
    })

    socket.on("private_message", (data) => {
        console.log(data);
        io.to(data.room).emit("private_message_response", data)  //try this out later to add rooms
        io.emit("private_message_response", data)

    })
})