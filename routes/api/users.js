const express = require("express")
const router = express.Router()

var user_controller = require('../../controllers/user');

const checkAuth = require("../../middlewares/checkAuth")


// GET request for getting friends of a specific user. 
//router.get('/user/getfriends/:uid', user_controller.user_get_friends);


// GET request for count of friends of a specific user. 
 router.get('/testfriends/:uid', user_controller.user_test_friends);

// GET request for count of friends of a specific user. 
 router.get('/countfriends/:uid', user_controller.user_count_friends);

// GET request for count of friends requests of a specific user. 
 router.get('/countfriendsreqs/:uid', user_controller.user_count_friendReqs);

// GET request for count of friends of a specific user. 
// router.get('/countfriends/:uid', function(req,res){
//     let uid = req.params.uid
//     res.json({"user":uid})
// });

module.exports = router