const mongoose = require('mongoose')
const Schema = mongoose.Schema

const OfferSchema = new Schema({
    _id : mongoose.Schema.Types.ObjectId,
    offer_name : {
        type: String,
        required: true
    },
    product_name : {
        type: String,
        required: true
    },
    code : {
        type: String,
        required: true
    },
    create_date: {
        type: String
    },

    expiry_date: {
        type: String,
        required: true
    },
    termsnconditions: {
        type: String,
        required: true
    },
    active_status: {
        type: Number,
        required: true
    },
    h_image: {
        type: String,
        required: true
    }
})

module.exports = Offer = mongoose.model('offer',OfferSchema)