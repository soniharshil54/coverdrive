const express = require("express")
const router = express.Router()
const multer = require("multer")
let Tshirt = require("../../models/tshirt")

var product_controller = require('../../controllers/products');
var tshirt_controller = require('../../controllers/tshirts')

const checkAuth = require("../../middlewares/checkAuth")

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './uploads/');
  },
  filename: function(req, file, cb) {
    cb(null, file.originalname);
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
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: fileFilter
});



// GET request to get specific user. 
//  router.get('/product/:pid', user_controller.user_get_user);

 // GET request to get all users. 
//  router.get('/products', user_controller.user_get_products);

 // GET request to get all users. 
 //router.post('/addproduct', product_controller.add_product);

 router.put('/addimage/:pid',upload.fields([{name: 'h_image', maxCount: 1}, {
  name: 'in_image', maxCount: 1}]),(req,res,next) => {
  console.log(req.files)
  let imageData = {}
  if(req.files.h_image){
    imageData.h_image = req.files.h_image[0].originalname
  }
  if(req.files.in_image){
    imageData.in_image = req.files.in_image[0].originalname
  }
  console.log("below data")
  console.log(imageData)
  Tshirt.findOneAndUpdate({_id:req.params.pid},imageData)
  .then(result=> {
    //console.log(result)
    res.json({"result":"keychain image updated","updatedkeychain":result})
  })
  .catch(err=>{
    console.log(err)
    res.status(404).json(err)
  }
    )
})

  // GET request to get all users. 
  router.post('/addtype', tshirt_controller.add_type);

  router.get('/types', tshirt_controller.get_types)

  router.get('/gettshirts', tshirt_controller.get_tshirts)

  router.post('/addtshirt', tshirt_controller.add_tshirt);

  router.delete('/deletetshirt', tshirt_controller.delete_tshirts)

  router.put('/edittshirt/:eid', tshirt_controller.edit_tshirt)

  // GET request to get all users. 
  //router.post('/addcategory', product_controller.add_category);
 

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