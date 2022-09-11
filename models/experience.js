const mongoose  = require('mongoose');

const Schema = mongoose.Schema;

const experienceSchema = new Schema({
    orderNo:{
        type: Number,
        requred: false
    },
    id:{
        type: Number,
        requred: true
    },
    title:{
        type: String,
        required: true
    },
    start:{
        type: String,
        required: true
    },
    end:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    }
}) 

module.exports = mongoose.model('Experience', experienceSchema)