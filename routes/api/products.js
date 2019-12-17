const express = require("express")
const router = express.Router()

var product_controller = require('../../controllers/products');

const checkAuth = require("../../middlewares/checkAuth")


router.get('/keychains', product_controller.get_keychains)

router.get('/mugs', product_controller.get_mugs)

router.get('/watchs', product_controller.get_watches)

router.get('/slipperbottles', product_controller.get_slipperbottles)

router.get('/wallclocks', product_controller.get_wallclocks)

router.get('/popholders', product_controller.get_popholders)

router.get('/photoframes', product_controller.get_photoframes)

router.put('/edit/keychain/:kid', product_controller.edit_keychain)

router.delete('/delete/keychain', product_controller.delete_keychains)



router.post('/add/keychain', product_controller.add_keychain);

router.post('/add/mug', product_controller.add_mug);

//router.post('/add/popholder', product_controller.add_popholder);

//router.post('/addmug', product_controller.add_mug);

router.post('/add/photoframe', product_controller.add_photoframe);

router.post('/add/popholder', product_controller.add_popholder);

router.post('/add/slipperbottle', product_controller.add_slipperbottle);

router.post('/add/wallclock', product_controller.add_wallclock);

router.post('/add/watch', product_controller.add_watch);

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