const mongoose = require('mongoose')
const Schema = mongoose.Schema

const AdminsideSchema = new Schema({
    _id : mongoose.Schema.Types.ObjectId,
    cod_charges : {
        type: Number,
        required: true
    },
    shipping_charges : {
        type: Number
    }
})

module.exports = Adminside = mongoose.model('adminside',AdminsideSchema)