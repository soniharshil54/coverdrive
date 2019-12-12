const express = require("express")
const router = express.Router()

var product_controller = require('../../controllers/products');

const checkAuth = require("../../middlewares/checkAuth")



// GET request to get specific user. 
//  router.get('/product/:pid', user_controller.user_get_user);

 // GET request to get all users. 
//  router.get('/products', user_controller.user_get_products);

 // GET request to get all users. 
 router.post('/addproduct', product_controller.add_product);

  // GET request to get all users. 
  router.post('/addcategory', product_controller.add_category);

 // GET request to get all users. 
//  router.post('/addcategory', user_controller.add_category);

 // GET request to get all users. 
//  router.post('/addsubcategory', user_controller.add_subcategory);

// GET request for count of friends of a specific user. 
//  router.get('/countusers', user_controller.user_count_users);

 // GET request for count of friends of a specific user. 
//  router.delete('/deleteproduct', user_controller.delete_product);

  // GET request for count of friends of a specific user. 
//   router.delete('/deletecategory', user_controller.delete_category);

// GET request for count of friends requests of a specific user. 
//  router.put('/updateuser/:uid', user_controller.user_update_user);

module.exports = router