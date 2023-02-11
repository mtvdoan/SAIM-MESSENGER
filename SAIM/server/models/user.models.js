
const mongoose = require('mongoose');
// const validator = require('validator')

const UserSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: [true, "A name is required and needs to be unique"],
        minlength: [3, 'Name is required and must be at least 3 characters'],
        unique: [true],
    },
    screenName: {
        type: String, 
        required: [true, "A ScreenName is required."],
        minlength: [3, 'ScreenName is required and must be at least 3 characters'],
        unique: [true],
    },
    password: {
        type: String, 
        required: [true, "A Password is required and must be at least 5 characters"],
        minlength: [5, 'Password is required and must be at least 5']
    },
    status:{
        type: String,
        required:[true, "Please assign status"]
    },
    chatRoom: {
        type: Number,
        required: [true, "A Chat Room is required"]
    }
},{timestamps: true}
);
const User =mongoose.model('User', UserSchema);
module.exports = User;