const express = require("express")
const router = express.Router()

var razorpay_controller = require('../../controllers/razorpays');


 router.post('/getorderidrzrpay', razorpay_controller.get_orderid_rzrpay)


module.exports = router