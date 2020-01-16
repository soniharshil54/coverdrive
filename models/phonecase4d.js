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
    type: String
  },
  company : {
      type: String,
      required: true
  },
  slider_image : {
    type: String,
    required: true
  },
  header_image : {
    type: String,
    required: true
  },
  png_image : {
    type: String,
    require: true
  },
  inner_image : {
    type: String,
    require: true
  },
  mask_image : {
    type: String,
    required: true
  },
  active_status : {
    type: String,
    default: 1
  }
})

module.exports = Phonecase4d = mongoose.model('phonecase4d',Phonecase4dSchema)