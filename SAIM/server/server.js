

const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const Msg  = require('./models/messages.model')
const mongoose = require('mongoose');
const {Server} = require("socket.io");
const mongoDB = "mongodb+srv://mtvdoan:I10v3413x@cluster0.havkg6w.mongodb.net/?retryWrites=true&w=majority";

const cors = require('cors');
const usersAwayMessagesPort = 8000;
require('dotenv').config();

const chatFunctionsPort = 3001;
// const io = new Server(server); taken out of original
app.use(cors());
const io = new Server(server, { //added this
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});


app.use(express.json());
app.use(express.urlencoded({extended: true}));

async function dbConnect() {
  // use mongoose to connect this app to our database on mongoDB using the DB_URL (connection string)
  mongoose
    .connect(
        process.env.DB_URL,
      {
        //   these are options to ensure that the connection is done properly
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
      }
    )
    .then(() => {
      console.log("Successfully connected to MongoDB Atlas!");
    })
    .catch((error) => {
      console.log("Unable to connect to MongoDB Atlas!");
      console.error(error);
    });
}
// module.exports = dbConnect;


// mongoose.connect(mongoDB, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// })
//   .then(() => {console.log('connected mongodb')})
//   .catch(err=> console.log(err));

require('./routes/user.routes')(app);


app.get('/', (req, res) => {
  res.sendFile(__dirname + '../client/src/components/Chat.jsx');
});
// io.on('connection', (socket) => {
//   console.log('printing above here?')
// });


io.on('connection', (socket) => {
  Msg.find().then(result=>{
    socket.emit('output-messages:', result)
  });
  console.log(`User Connected: ${socket.id}`); //added this
  socket.on("join_room", (data) => {
      socket.join(data);
      console.log(`User with ID: ${socket.id} joined room: ${data}`);
    });

  // socket.emit('message', 'Hello world'); taken out from original
  // socket.on('chat message', msg=> {  taken out from original
  //   const message = new Msg({msg:msg});
  //   message.save().then(() => {
  //   io.emit('message', msg)
  //   })
  // })
  socket.on("chat message", (data) => {  //added this
    socket.to(data.room).emit("chat message", data);  //might need to change chat message to 'receive_message' later
  });

  socket.on('disconnect', () => {
    console.log('User Disconnected', socket.id);
  });
});

io.on('connection', (socket) => {
  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });
});


server.listen(chatFunctionsPort, () => {
  console.log(`Chat Functions: Listening on -->  ${chatFunctionsPort}`);
});


app.listen(usersAwayMessagesPort, () => console.log(`Users and away messages functions: Listening on port  --> ${usersAwayMessagesPort}`));
