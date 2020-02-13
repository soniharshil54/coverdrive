const mongoose = require('mongoose')
const Schema = mongoose.Schema

const NotiffrcmidSchema = new Schema({
    _id : mongoose.Schema.Types.ObjectId,
    registration_id : {
        type: String,
        required: true
    },
})

module.exports = Notiffrcmid = mongoose.model('notiffrcmid',NotiffrcmidSchema)