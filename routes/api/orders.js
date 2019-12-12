const express = require("express")
const router = express.Router()

var user_controller = require('../../controllers/user');

const checkAuth = require("../../middlewares/checkAuth")



// GET request to get specific order details. 
//  router.get('/order/:oid', order_controller.order_get_order);

 // GET request to get all users. 
//  router.get('/orders', order_controller.orders_get_orders);

// GET request for count of friends of a specific user. 
//  router.get('/countusers', user_controller.user_count_users);

 // GET request for count of friends of a specific user. 
//  router.delete('/deleteuser', user_controller.user_delete_user);

// GET request for count of friends requests of a specific user. 
 router.put('/updateuser/:uid', user_controller.user_update_user);

module.exports = router