
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
// const validator = require('validator')

const UserSchema = new mongoose.Schema({
    screenName: {
        type: String,
        required:[true, "A screen name is required." ],
        minlength: [3, 'A screen name needs to be at least 3 characters long']
    },
    email: {
        type: String,
        required: [true, "An email required."],
        minlength: [3, 'Email must be at least 3 characters'],
        validate: {
            validator: val => /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(val),
            message: "Invalid email format"
        },
    },
    password: {
        type: String,
        required: [true, "A Password is required."],
        minlength: [3, 'Password is required and must be at least 3 characters'],
    },

},{timestamps: true}
);
const User =mongoose.model('User', UserSchema);
module.exports = UserSchema;