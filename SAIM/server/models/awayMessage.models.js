
const mongoose = require('mongoose');
// const validator = require('validator')

const AwayMessageSchema = new mongoose.Schema({

    awayMessageLabel: {
        type: String,
        required: [true, "An Away Message label is required."],
        minlength: [3, 'Away Message label is required and must be at least 3 characters'],
    },
    awayMessage: {
        type: String,
        required: [true, "An Away Message is required."],
        minlength: [3, 'Away Message is required and must be at least 3 characters'],
    },

},{timestamps: true}
);
const AwayMessage =mongoose.model('AwayMessage', AwayMessageSchema);
module.exports = AwayMessage;