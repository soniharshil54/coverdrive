const mongoose = require('mongoose')
const Schema = mongoose.Schema

const OfferSchema = new Schema({
    _id : mongoose.Schema.Types.ObjectId,
    code : {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    products: {
        type: String,
        required: true
    },
    valid_upto: {
        type: String,
        required: true
    },
    min_cost: {
        type: Number,
        required: true
    }  ,
    discount: {
        discount_type: String,
        digit: Number
    },
    description: {
        type: String
    }
})

module.exports = Offer = mongoose.model('offer',OfferSchema)