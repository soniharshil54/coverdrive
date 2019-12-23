const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Order = require('./order')
const Phonecase = require("./phonecase")

const Phonecase4dSchema = new Schema({
  _id : mongoose.Schema.Types.ObjectId,
  model_name : {
      type: String,
      required: true
  },
  model_id : {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Phonecase',
    required: true
  },
  company : {
      type: String,
      required: true
  },
  slider_image : {
    type: String,
    required: true
  },
  inner_image : {
    type: String,
    required: true
  },
})

module.exports = Phonecase4d = mongoose.model('phonecase4d',Phonecase4dSchema)