const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Order = require('./order')

const WallclocksubtypeSchema = new Schema({
  _id : mongoose.Schema.Types.ObjectId,
  name : {
    type: String,
    required: true
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

module.exports = Wallclocksubtype = mongoose.model('wallclocksubtype',WallclocksubtypeSchema)