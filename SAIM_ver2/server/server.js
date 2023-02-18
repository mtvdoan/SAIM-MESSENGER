const express = require('express');
const app = express();
const cors = require('cors')
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const myFirstSecret = process.env.FIRST_SECRET_KEY;
const http = require('http');
const port = 8000;
const server = app.listen(port, () => console.log("Listening on port", port));
const socketio = require('socket.io')
require('./config/mongoose.config')

app.use(cors({credentials: true, origin: 'http://localhost:3000'})); 

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
console.log(JSON.stringify(socketio))
io.on("connection", (socket) => {
    console.log(" server io ...on")
    console.log("Socket:", socket.id, "connected to the server");
    console.log(`Message sent from ${socket.id}: ${socket}`);
    // console.log("Is io on from server printing data?", data);
    socket.on("send_message", (data) => {
        io.emit("message_received", data)
        console.log("io:", io);
        console.log("emit:", emit);
    })

    // socket.on("join_room", (data) => {
    //     console.log("Joined room:", data);
    //     socket.join(data)
    // })

    socket.on("private_message", (data) => {
        console.log(data);
        // io.to(data.room).emit("private_message_response", data)  //try this out later to add rooms
        io.emit("private_message_response", data)

    })
})