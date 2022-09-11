const mongoose = require('mongoose')
const Schema =mongoose.Schema;

const messageSchema = new Schema({
    name: {
        type: String,
        required: [true, "Name is required!!!"],
    },
    email: {
        type: String,
        required: [true, "Email is required!!!"],
    },
    phone: {
        type: String,
        required: [true, "Phone is required!!!"],
    },
    content: {
        type: String,
        required: [true, "Message content is required!!!"],
    },
})

module.exports = mongoose.model("Message", messageSchema)