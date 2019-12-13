const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Order = require('./order')

const TshirtSchema = new Schema({
    _id : mongoose.Schema.Types.ObjectId,
    name : {
        type: String,
        required: true
    },
    type: [{
        name: String,
        header_image: String,
        models :[{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Tshirtmodel'
          }]
      }],
    orders: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order'
      }],
    available_status: {
        type: Number,
        default: 1
    }  
})

module.exports = Tshirt = mongoose.model('tshirt',TshirtSchema)