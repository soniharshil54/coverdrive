const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CartproductSchema = new Schema({
    _id : mongoose.Schema.Types.ObjectId,
    product_name : {
        type: String,
        required: true
    },
    product_id : {
        type: String
    },
    company_id : String,
    model_id : String,
    cover_type : String,
    image : {
        type: String,
        required: true
    },
    print_name : String,
    size: String,
    quantity : String
})

module.exports = Cartproduct = mongoose.model('cartproduct',CartproductSchema)