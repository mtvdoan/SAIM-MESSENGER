// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt');
const socket = require('socket.io');

const app = express();
const server = app.listen(5000, () => console.log('Server started on port 5000'));
const io = socket(server);

app.use(express.json());
app.use(cors());

mongoose.connect('mongodb://localhost/chat-app', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

UserSchema.pre('save', function (next) {
  const user = this;
  if (!user.isModified('password')) return next();
  bcrypt.genSalt(10, (err, salt) => {
    if (err) return next(err);
    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) return next(err);
      user.password = hash;
      next();
    });
  });
});

UserSchema.methods.comparePassword = function (candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

const User = mongoose.model('User', UserSchema);

app.post('/register', async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.send({ user });
  } catch (err) {
    console.error(err);
    res.status(400).send(err);
  }
});

app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(401).send({ error: 'Invalid login credentials' });
    user.comparePassword(password, (err, isMatch) => {
      if (err) throw err;
      if (!isMatch) return res.status(401).send({ error: 'Invalid login credentials' });
      res.send({ user });
    });
  } catch (err) {
        console.error(err);
    res.status(400).send(err);
  }
});

io.on('connection', (socket) => {
  console.log(`A user connected: ${socket.id}`);
  socket.on('disconnect', () => console.log(`A user disconnected: ${socket.id}`));
  socket.on('chat message', (msg) => {
    console.log(`Message: ${msg}`);
    io.emit('chat message', msg);
  });
});

