const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const skillSchema = new Schema({
    orderNo:{
        type: Number,
        requred: false
    },
    skillName: {
        type: String,
        required: true
    },
    skillPercentage: {
        type: Number,
        required: true
    }
})

module.exports = mongoose.model("Skill", skillSchema)