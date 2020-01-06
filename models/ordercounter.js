const mongoose = require('mongoose')
const Schema = mongoose.Schema

const OrdercounterSchema = new Schema({
    _id : String,
    sequence : {
        type: Number
    },
})

module.exports = ordercounter = mongoose.model('Ordercounter',OrdercounterSchema)