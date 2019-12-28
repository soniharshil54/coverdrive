const express = require("express")
const router = express.Router()


var admin_controller = require('../../controllers/admins');

const checkAuth = require("../../middlewares/checkAuth")



// GET request to get specific user. 
  router.get('/getadmin/:uid', admin_controller.get_admin);

// GET request to get specific user. 
router.get('/admins', admin_controller.get_all_admins);  

 // GET request to get all users. 
 router.post('/register', admin_controller.register_admin);

 router.put('/changepassword/:cid', admin_controller.change_password);

// GET request for count of friends of a specific user. 
 router.get('/countusers', admin_controller.count_admins);

 //router.get('/countsummary', admin_controller.count_summary)

 // GET request for count of friends of a specific user. 
 router.delete('/deleteadmin/:did', admin_controller.delete_admin);

 router.post('/login', admin_controller.login_admin)

// GET request for count of friends requests of a specific user. 
 router.put('/editadmin/:eid', admin_controller.edit_admin);

module.exports = router