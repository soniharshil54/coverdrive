const mongoose = require('mongoose')
const Schema = mongoose.Schema

const OrderSchema = new Schema({
    _id : mongoose.Schema.Types.ObjectId,
    user_name : {
        type: String,
        required: true
    },
    products: [String],
    user_details: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Admin'
    },
    payment_type: {
        type: Number,
        required:true
    },
    paid_status: {
        type: String
        
    }  ,
    order_summary: {
        type:[{
            product: String,
            amount: Number
        }]
    },
    total_amount: {
        type:Number,
        required: true
    },
    offer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Offer'
    },
    discount: {
        type:Number,
        required: true
    },
    payable_amount: {
        type:String,
        required: true
    },
    date_ordered: {
        type:String,
        required: false
    },
    date_delivered: {
        type: String,
        required: true
    }
})

module.exports = Order = mongoose.model('order',OrderSchema)