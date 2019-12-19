const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Order = require('./order')

const TshirttypeSchema = new Schema({
  _id : mongoose.Schema.Types.ObjectId,
  name : String
})

module.exports = Tshirttype = mongoose.model('tshirttype',TshirttypeSchema)