const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PincodeSchema = new Schema({
    _id : mongoose.Schema.Types.ObjectId,
    cod_available : [String]
})

module.exports = Pincode = mongoose.model('pincode',PincodeSchema)