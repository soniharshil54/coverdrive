const express = require("express")
const router = express.Router()

var user_controller = require('../../controllers/users');
var offer_controller = require('../../controllers/offers');

const checkAuth = require("../../middlewares/checkAuth")



// GET request to get specific user. 
// router.get('/getoffer/:offerid', offer_controller.get_offer);

// GET request to get specific user. 
router.get('/getoffers', offer_controller.get_all_offers);  

 // GET request to get all users. 
 router.post('/addoffer', offer_controller.add_offer);

// GET request for count of friends of a specific user. 
//  router.get('/countusers', user_controller.count_users);

 // GET request for count of friends of a specific user. 
//  router.delete('/deleteuser/:did', user_controller.delete_user);

// GET request for count of friends requests of a specific user. 
//  router.put('/edituser/:eid', user_controller.edit_user);

module.exports = router