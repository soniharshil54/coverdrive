const express = require("express")
const router = express.Router()

var notification_controller = require('../../controllers/notifications');

//const checkAuth = require("../../middlewares/checkAuth")



// GET request to get specific user. 
//router.get('/getuser/:uid', user_controller.get_user);

//router.get('/getsmsdata', user_controller.get_sms_data)

 router.post('/addregistrationtoken', notification_controller.add_registration_token)

 router.get('/getregistrationtokens', notification_controller.get_registration_tokens)

 router.post('/postsmsdata', notification_controller.post_sms_data)

 router.post('/postorderconfirm', notification_controller.post_order_confirm_sms)

 router.post('/otpverification', notification_controller.otp_verification)

 router.post('/sendnotificationtoandroid', notification_controller.send_notification_to_android)

// GET request for count of friends of a specific user. 
// router.get('/countusers', user_controller.count_users);


module.exports = router