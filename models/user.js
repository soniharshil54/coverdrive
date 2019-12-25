const mongoose = require('mongoose')
const Schema = mongoose.Schema
mongoose.set('useCreateIndex', true)
const UserSchema = new Schema({
    _id : mongoose.Schema.Types.ObjectId,
    first_name : {
        type: String,
        required: true
    },
    last_name : {
        type: String,
        required: true
    },
    contact: {
        type: Number,
        required:true
    },
    email_id: {
        type: String
    },
    address_type: {
        type:String,
        required: true
    },
    state: {
        type:String,
        required: true
    },
    city: {
        type:String,
        required: true
    },
    pincode: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    }
})

module.exports = User = mongoose.model('user',UserSchema)