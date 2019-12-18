const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Order = require('./order')

const PhonecaseSchema = new Schema({
  _id : mongoose.Schema.Types.ObjectId,
  name : {
      type: String,
      required: true
  },
  company : {
      type: String,
      required: true
  },
  image_2d : {
      type: String,
      required: true
  },
  image_3d : {
      type: String,
      required: true
  },
  image_4d : {
    type: String,
    required: true
},
  price : {
      type: Number,
      required: true
  },
  description : {
      type : String,
      required : true
  },
  available_status : {
      type : Number,
      default : 1
  } 
})

module.exports = Phonecase = mongoose.model('phonecase',PhonecaseSchema)