const mongoose = require('mongoose')
const Schema = mongoose.Schema

const MainslideSchema = new Schema({
    _id : mongoose.Schema.Types.ObjectId,
    product_name : {
        type: String,
        required: true
    },
    product_display_name : {
        type: String,
        required: true
    },
    slider_image : {
        type: String,
        default: "noimage.png"
    },
    active_status : {
        type: Number,
        default: "1"
    }
})

module.exports = Mainslide = mongoose.model('mainslide',MainslideSchema)