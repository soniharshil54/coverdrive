const mongoose = require('mongoose')
const Schema = mongoose.Schema

const OrderSchema = new Schema({
    _id : mongoose.Schema.Types.ObjectId,
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
    total_amount: {
        type:Number,
        required: true
    },
    date_ordered: {
        type:String,
        required: false
    },
    is_delivered: {
        type : Number,
        default : 0
    },
    date_delivered: {
        type: String,
        required: true
    }
})

module.exports = Order = mongoose.model('order',OrderSchema)