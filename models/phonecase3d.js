const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Order = require('./order')
const Phonecase = require("./phonecase")

const Phonecase3dSchema = new Schema({
  _id : mongoose.Schema.Types.ObjectId,
  model_name : {
      type: String,
      required: true
  },
  model_id : {
    type: String
  },
  name : {
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
  active_status : {
    type: Number,
    default: 1
  }
})

module.exports = Phonecase3d = mongoose.model('phonecase3d',Phonecase3dSchema)