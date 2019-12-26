const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Order = require('./order')

const PhonecompSchema = new Schema({
  _id : mongoose.Schema.Types.ObjectId,
  name : {
    type: String,
    required: true
  },
  active_status : {
    type : Number,
    required:true,
    default:1
  }
})

module.exports = Phonecomp = mongoose.model('phonecomp',PhonecompSchema)