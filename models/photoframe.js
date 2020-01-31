const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Order = require('./order')

const PhotoframeSchema = new Schema({
    _id : mongoose.Schema.Types.ObjectId,
    name : {
        type: String,
        required: true
    },
    photoframe_type : {
        type:String
    },
    photoframe_type_name : {
        type:String
    },
    size : {
        type: String,
        required: true
    },
    pick_image_size : {
        type: String,
        required: true
    },
    h_image : {
        type: String,
        required: true
    },
    shadow_image : {
        type: String,
        required: true
    },
    overlay_image : {
        type: String,
        required: true
    },
    mask_image : {
        type: String,
        required: true
    },
    price : {
        type: Number,
        required: true
    },
    description : {
        type : String,
        required : true
    },
    available_status : {
        type : Number,
        default : 1
    },
    create_date: {
        type:Date,
        default: Date.now,
        required: true
    }
})

module.exports = Photoframe = mongoose.model('photoframe',PhotoframeSchema)