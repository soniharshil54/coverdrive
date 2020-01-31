const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Order = require('./order')

const TshirtmaintypeSchema = new Schema({
  _id : mongoose.Schema.Types.ObjectId,
  type_id : {
    type: String,
    required: true
  },
  type_name : {
    type: String,
    required: true
  },
  subtype_id : {
      type : String,
      required: true
  },
  subtype_name : {
    type: String,
    required: true
  },
  name : {
      type : String,
      required : true
  },
  slider_image : {
    type : String,
    required: true
  },
  active_status : {
    type : Number,
    required:true,
    default:0
  },
  create_date: {
    type:Date,
    default: Date.now,
    required: true
   }
})

module.exports = Tshirtmaintype = mongoose.model('tshirtmaintype',TshirtmaintypeSchema)