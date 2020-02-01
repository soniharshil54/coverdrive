const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Order = require('./order')

const TshirtsubtypeSchema = new Schema({
  _id : mongoose.Schema.Types.ObjectId,
  name : {
    type: String,
    required: true
  },
  subtype_name : {
    type: String
  },
  active_status : {
    type : Number,
    required:true,
    default:1
  },
  create_date: {
    type:Date,
    default: Date.now,
    required: true
   }
})

module.exports = Tshirtsubtype = mongoose.model('tshirtsubtype',TshirtsubtypeSchema)