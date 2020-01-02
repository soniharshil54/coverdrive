const mongoose = require('mongoose')
const Schema = mongoose.Schema

const SmsdataSchema = new Schema({
    _id : mongoose.Schema.Types.ObjectId,
    sendtotype : {
        type: String,
        required: true
    },
    sendto : {
        type: String
    },
    content : {
        type : String
    }
})

module.exports = Smsdata = mongoose.model('smsdata',SmsdataSchema)