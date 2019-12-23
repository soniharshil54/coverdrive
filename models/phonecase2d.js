const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Order = require('./order')
const Phonecase = require("./phonecase")

const Phonecase4dSchema = new Schema({
  _id : mongoose.Schema.Types.ObjectId,
  model_id : {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Phonecase',
    required: true
  },
  price : {
      type: String,
      required: true
  },
  size : {
    type: String,
    required: true
  },
  description : {
    type: String,
    required: true
  },
  image_inner : {
      type : String,
      required : true
  }
})

module.exports = Phonecase4d = mongoose.model('phonecase4d',Phonecase4dSchema)