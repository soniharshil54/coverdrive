const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Order = require('./order')

const TshirtSchema = new Schema({
  _id : mongoose.Schema.Types.ObjectId,
  name : {
      type: String,
      required: true
  },
  type : {
      type: String,
      required: true
  },
  category : {
      type: String,
      required: true
  },
  h_image : {
      type: String,
      required: true
  },
  in_image : {
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
  sizes_available : [String],
  size : {
    type : String,
    default: "12x12"
},
  available_status : {
      type : Number,
      default : 1
  } 
})

module.exports = Tshirt = mongoose.model('tshirt',TshirtSchema)