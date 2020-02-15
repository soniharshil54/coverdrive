const express = require("express")
const router = express.Router()
const multer = require("multer")



var notification_controller = require('../../controllers/notifications');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, './uploads/');
    },
    filename: function(req, file, cb) {
      let timestampref = Math.floor(Date.now() / 1000)
      let slidernameref = `${timestampref}-${file.originalname}`
      cb(null, slidernameref);
    }
  });
  
  const fileFilter = (req, file, cb) => {
    // reject a file
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg') {
      cb(null, true);
    } else {
      cb(null, false);
    }
  };
  
  const upload = multer({
    storage: storage,
    limits: {
      fileSize: 2024 * 2024 * 5
    },
    fileFilter: fileFilter
  });
  
  router.post('/addsendnotification',upload.single('notification_image'),notification_controller.add_send_notification)

  router.get('/getnotifications', notification_controller.get_notifications)

  router.get('/getnotification/:nid', notification_controller.get_notification)


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