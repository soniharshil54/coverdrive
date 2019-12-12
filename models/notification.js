const mongoose = require('mongoose')
const Schema = mongoose.Schema

const NotificationSchema = new Schema({
    _id : mongoose.Schema.Types.ObjectId,
    content : {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    sent_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Admin'
    },
    send_to: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      }]  ,
    send_status: {
        type:Number,
        required: true
    }
})

module.exports = Notification = mongoose.model('notification',NotificationSchema)