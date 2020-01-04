const mongoose = require('mongoose')
const Schema = mongoose.Schema

const SecondaryslideSchema = new Schema({
    _id : mongoose.Schema.Types.ObjectId,
    slider_name : {
        type: String,
        required: true
    },
    slider_display_name : {
        type: String,
        required: true
    },
    product_name : {
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

module.exports = Secondaryslide = mongoose.model('secondaryslide',SecondaryslideSchema)