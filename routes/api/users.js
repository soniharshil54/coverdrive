const express = require("express")
const router = express.Router()

var user_controller = require('../../controllers/users');

const checkAuth = require("../../middlewares/checkAuth")



// GET request to get specific user. 
  router.get('/getuser/:uid', user_controller.get_user);

// GET request to get specific user. 
router.get('/users', user_controller.get_all_users);  

 // GET request to get all users. 
 router.post('/register', user_controller.register_user);

// GET request for count of friends of a specific user. 
 router.get('/countusers', user_controller.count_users);

 // GET request for count of friends of a specific user. 
 router.delete('/deleteuser/:did', user_controller.delete_user);

 router.delete('/deleteusers', user_controller.delete_users)

// GET request for count of friends requests of a specific user. 
 router.put('/edituser/:eid', user_controller.edit_user);

module.exports = router