const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Order = require('./order')

const MugSchema = new Schema({
    _id : mongoose.Schema.Types.ObjectId,
    name : {
        type: String,
        required: true
    },
    volume : {
        type: String,
        required: true
    },
    header_image : {
        type: String,
        required: true
    },
    price : {
        type: Number,
        required: true
    },
    in_image : {
        type: String,
        required: true
    },
    pick_image_size : {
        type: String,
        required: true
    },
    description : {
        type : String,
        required : true
    },
    available_status : {
        type : Number,
        required : true
    } 
})

module.exports = Mug = mongoose.model('mug',MugSchema)