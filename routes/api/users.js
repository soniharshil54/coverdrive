const express = require("express")
const router = express.Router()

var user_controller = require('../../controllers/users');

const checkAuth = require("../../middlewares/checkAuth")



// GET request to get specific user. 
router.get('/getuser/:uid', user_controller.get_user);



router.get('/getsmsdata', user_controller.get_sms_data)

// GET request to get specific user. 
router.get('/users', user_controller.get_all_users);  

router.get('/activeusers', user_controller.get_active_users); 

router.get('/getcontacts', user_controller.get_contacts);

 // GET request to get all users. 
 router.post('/register', user_controller.register_user);

 router.post('/postsmsdata', user_controller.post_sms_data)

// GET request for count of friends of a specific user. 
 router.get('/countusers', user_controller.count_users);

 // GET request for count of friends of a specific user. 
 router.delete('/deleteuser/:did', user_controller.delete_user);

 router.delete('/deleteusers', user_controller.delete_users)

 router.put('/deactivateusers', user_controller.deactivate_users)

// GET request for count of friends requests of a specific user. 
 router.put('/edituser/:eid', user_controller.edit_user);

router.put('/editallusers', user_controller.edit_all_users)


module.exports = router