const mongoose = require('mongoose')
const Schema = mongoose.Schema

const OtptempSchema = new Schema({
    _id : mongoose.Schema.Types.ObjectId,
    tempotp : String,
    create_time: {
        type:Date,
        default: Date.now,
        required: true
    }
})

module.exports = Otptemp = mongoose.model('otptemp',OtptempSchema)