const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Order = require('./order')

const ProductSchema = new Schema({
    _id : mongoose.Schema.Types.ObjectId,
    name : {
        type: String,
        required: true
    },
    categories: {
        type: [
            {
                model: String,
                subcategory: [String],
                price: Number,
                available_status: Number
            }
        ]
    },
    orders: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order'
      }]
})

module.exports = Product = mongoose.model('product',ProductSchema)