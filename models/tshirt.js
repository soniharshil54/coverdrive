const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Order = require('./order')

const TshirtSchema = new Schema({
    _id : mongoose.Schema.Types.ObjectId,
    name : {
        type: String,
        required: true
    },
    maintype_id : {
        type: String,
        required: true
    },
    maintype_name : {
        type: String,
        required: true
    },
    type_id : {
        type: String,
        required: true
    },
    type_name : {
        type: String,
        required: true
    },
    subtype_id : {
        type: String,
        required: true
    },
    sizes_available : [String],
    sizes_available_2 : [String],
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
    regular_images : [String],
    price : {
        type: Number,
        required: true
    },
    description : {
        type : String,
        required : true
    },
    pick_image_size : {
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

module.exports = Tshirt = mongoose.model('tshirt',TshirtSchema)