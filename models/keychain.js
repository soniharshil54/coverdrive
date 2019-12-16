const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Order = require('./order')

const KeychainSchema = new Schema({
    _id : mongoose.Schema.Types.ObjectId,
    name : {
        type: String,
        required: true
    },
    size : {
        type: String,
        required: true
    },
    h_image : {
        type: String,
        required: true
    },
    in_image : {
        type: String,
        required: true
    },
    price : {
        type: Number,
        required: true
    },
    description : {
        type : String,
        required : true
    },
    available_status : {
        type : Number,
        default : 1
    } 
})

module.exports = Keychain = mongoose.model('keychain',KeychainSchema)