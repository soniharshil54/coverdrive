const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Order = require('./order')

const PhotoframetypeSchema = new Schema({
  _id : mongoose.Schema.Types.ObjectId,
  name : {
    type: String,
    required: true
  },
  slider_image : {
      type : String,
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

module.exports = Photoframetype = mongoose.model('photoframetype',PhotoframetypeSchema)