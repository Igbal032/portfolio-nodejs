const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    surname:{
        type: String,
        required: true
    },
    birthDay:{
        type: Date,
        required: true
    },
    about:{
        type: String,
        required: true
    },
    professinal:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    phone:{
        type: String,
        required: true
    },
    contactContent:{
        type: String,
        required: true
    },
    cv:{
        type: String,
        required: false
    },
    cvBase64:{
        type: String,
        required: false
    }
})

module.exports = mongoose.model("User", userSchema);