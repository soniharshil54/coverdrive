const mongoose = require('mongoose')
const Schema = mongoose.Schema

const OfferSchema = new Schema({
    _id : mongoose.Schema.Types.ObjectId,
    offer_name : {
        type: String,
        required: true
    },
    offer_type : {
        type: String
    },
    categories : [{
        type: String
    }],
    code : {
        type: String,
        required: true
    },
    create_date: {
        type: Date,
        default: Date.now
    },

    expiry_date: {
        type: Date,
        required: true
    },
    buy_product: {
        type: String
    },
    get_product: {
        type: String
    },
    flat_discount: {
        type: String
    },
    freeshipping: {
        type: String
    },
    firsttime_dis: {
        type: String
    },
    min_spend: {
        type: String
    },
    max_spend: {
        type: String
    },
    termsnconditions: {
        type: String,
        required: true
    },
    active_status: {
        type: Number,
        default: 1,
        required: true
    },
    free_shipping_allow : {
        type: Number,
        default: 1
    },
    usage_limit : {
        type: String,
        default: "100"
    },
    h_image: {
        type: String,
        required: true
    }
})

module.exports = Offer = mongoose.model('offer',OfferSchema)