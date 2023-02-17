
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
// const Schema=mongoose.Schema;
// const validator = require('validator')

const UserSchema = new mongoose.Schema({
  screenName: {
    type: String,
    unique: true
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    validate: {
  validator: val => /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(val),
  message: "Please enter a valid email"
}



  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: [2, "Password must be 2 characters or longer"]
  }
}, {timestamps: true});

UserSchema.pre('validate', function(next) {
  if (this.password !== this.confirmPassword) {
    this.invalidate('confirmPassword', 'Password must match confirm password');
  }
  next();
});

// add this after UserSchema is defined

UserSchema.virtual('confirmPassword')
  .get( () => this._confirmPassword )
  .set( value => this._confirmPassword = value );

UserSchema.pre("validate", function(next) {
    if (this.password !== this.confirmPassword) {
        this.invalidate("confirmPassword", "Password must match confirm password")
    } else {
        next()
    }
})

UserSchema.pre("save", function(next) {
    bcrypt.hash(this.password, 10)
        .then(hash => {
            this.password = hash
            next();
        })
})

const User = mongoose.model("User", UserSchema);
module.exports = User;