
const mongoose = require('mongoose');
// const validator = require('validator')
const bcrypt = require('bcrypt');
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
        unique: [true]
    },

    email:{
        type: String,
        required: [true, "Email is required"],
        validate: {
            validator: val => /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(val),
            message: "Invalid email format"
        },
        
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
UserSchema.virtual("confirmPassword")
    .get(() => this._confirmPassword)
    .set(val => this._confirmPassword = val)

UserSchema.pre("validate", function(next) {
    if (this.password !== this.confirmPassword) {
        this.invalidate("confirmPassword", "Password must match confirm password")
    } else {
        next()
    }
});

UserSchema.pre("save", function(next) {
    bcrypt.hash(this.password, 10)
        .then(hash => {
            this.password = hash
            next();
        })
});

const User =mongoose.model('User', UserSchema);
module.exports = User;