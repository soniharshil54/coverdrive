const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Order = require('./order')
const Phonecase4d = require('./phonecase4d')

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
  image_header_2d : {
      type: String,
      required: true
  },
  image_header_3d : {
      type: String,
      required: true
  },
  image_header_4d : {
    type: String,
    required: true
},
image_inner_2d : {
    type: String,
    required: true
},
image_mask_2d : {
    type: String,
    required: true
},
image_inner_3d : {
    type: String,
    required: true
},
image_mask_3d : {
    type: String,
    required: true
},
image_inner_4d : {
    type: String,
    required: true
},

  price_2d : {
      type: Number,
      required: true
  },
  price_3d : {
    type: Number,
    required: true
},
price_4d : {
    type: Number,
    required: true
},
  description_2d : {
      type : String,
      required : true
  },
  description_3d : {
    type : String,
    required : true
},
description_4d : {
    type : String,
    required : true
},
  size_2d : {
    type : String,
    default: "36x63"
},
size_3d : {
    type : String,
    default: "36x63"
},
size_4d : {
    type : String,
    default: "36x63"
},
available_2d : {
    type : Number
},
available_3d : {
    type : Number
},
available_4d : {
    type : Number,
    default : 1
},
create_date: {
    type:Date,
    default: Date.now,
    required: true
}, 
covers_4d: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'phonecase4d'
  }]  ,
  available_status : {
      type : Number,
      default : 1
  } 
})

module.exports = Phonecase = mongoose.model('phonecase',PhonecaseSchema)