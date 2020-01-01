const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ModelrequestSchema = new Schema({
    _id : mongoose.Schema.Types.ObjectId,
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: false
    },
    model_name: {
        type: String,
        required: true
    }
})

module.exports = Modelrequest = mongoose.model('modelrequest',ModelrequestSchema)