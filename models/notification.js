const mongoose = require('mongoose')
const Schema = mongoose.Schema

const NotificationSchema = new Schema({
    _id : mongoose.Schema.Types.ObjectId,
    title : {
        type : String
    },
    message : {
        type : String
    },
    image : {
        type : String
    },
    isImage : {
        type: Number
    },
    create_date: {
        type:Date,
        default: Date.now,
        required: true
    }
})

module.exports = Notification = mongoose.model('notification',NotificationSchema)