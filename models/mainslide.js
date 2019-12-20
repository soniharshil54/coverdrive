const mongoose = require('mongoose')
const Schema = mongoose.Schema

const MainslideSchema = new Schema({
    _id : mongoose.Schema.Types.ObjectId,
    product_name : {
        type: String,
        required: true
    },
    silde_name : {
        type: String,
        default: "noimage.png"
    }
})

module.exports = Mainslide = mongoose.model('mainslide',MainslideSchema)