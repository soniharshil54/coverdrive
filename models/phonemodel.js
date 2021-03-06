const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Order = require('./order')

const PhonemodelSchema = new Schema({
    _id : mongoose.Schema.Types.ObjectId,
    name : {
        type: String,
        required: true
    },
    company : {
        type: String,
        required: true
    },
    image_2d : {
        type: String,
        required: true
    },
    image_3d : {
        type: String,
        required: true
    },
    image_4d : [String],
    price: {
        type: Number,
        default: 299
    }, 
    req_image_size : {
        type: String,
        required: true
    },
    orders: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order'
      }],
    available_status: {
        type: Number,
        default: 1
    }  
})

module.exports = Phonemodel = mongoose.model('phonemodel',PhonemodelSchema)