const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Order = require('./order')

const TshirtmodelSchema = new Schema({
    _id : mongoose.Schema.Types.ObjectId,
    name : {
        type: String,
        required: true
    },
    size : {
        type: String,
        required: true
    },
    header_image : {
        type: String,
        required: true
    },
    in_image : {
        type: String,
        required: true
    },
    description : {
        type: String,
        required: true
    },
    pick_img_size : {
        type: String,
        required: true
    },
    price: {
        type: Number,
        default: 299
    },
    sizes_available: {
        type: [String]
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

module.exports = Tshirtmodel = mongoose.model('tshirt',TshirtmodelSchema)