const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Order = require('./order')

const PhonecompSchema = new Schema({
  _id : mongoose.Schema.Types.ObjectId,
  name : {
    type: String,
    required: true
  }
})

module.exports = Phonecomp = mongoose.model('phonecomp',PhonecompSchema)