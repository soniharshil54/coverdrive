const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Order = require('./order')

const PillowSchema = new Schema({
    _id : mongoose.Schema.Types.ObjectId,
    name : {
        type: String,
        required: true
    },
    models: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Phonemodel'
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

module.exports = Pillow = mongoose.model('pillow',PillowSchema)