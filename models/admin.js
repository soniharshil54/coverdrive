const mongoose = require('mongoose')
const Schema = mongoose.Schema

const AdminSchema = new Schema({
    _id : mongoose.Schema.Types.ObjectId,
    name : {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
        unique: true
    },
    contact: {
        type: Number,
        required:true
    },
    password: {
        type: String,
        required: true
    }

})

module.exports = Admin = mongoose.model('admin',AdminSchema)