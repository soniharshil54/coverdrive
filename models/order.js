const mongoose = require('mongoose')
const Schema = mongoose.Schema

const OrderSchema = new Schema({
    _id : mongoose.Schema.Types.ObjectId,
    order_id : {
        type : String
    },
    products: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'cartproduct'
    }] ,
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    payment_type: {
        type: String,
        required:true
    },
    is_paid: {
        type: Number,
        default : 0
    },
    date_ordered: {
        type:Date,
        default: Date.now,
        required: true
    },
    is_delivered: {
        type : Number,
        default : 0
    },
    order_status: {
        type: String
    },
    date_delivered: {
        type: String,
        required: false
    },
    active: {
        type: Number,
        default: 1
    },
    gst_tax: {
        type: Number
    },
    shipping: {
        type: Number
    },
    sub_total: {
        type: Number
    },
    coupon_amount: {
        type: Number
    },
    coupon_used: {
        type: String
    },
    amount: {
        type: Number
    }
})

module.exports = Order = mongoose.model('order',OrderSchema)