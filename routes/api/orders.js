const express = require("express")
const router = express.Router()
const multer = require("multer")
const Cartproduct = require("../../models/cartproduct")

var order_controller = require('../../controllers/orders');

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
  
  router.put('/addimagetoproduct/:cartproid',upload.single('product_img'),(req,res,next) => {
    console.log("below file")
    console.log(req.file)
    console.log(req.params.cartproid)
    let imageData = {}
    if(req.file){
      imageData.image = req.file.originalname
    }
    Cartproduct.findOneAndUpdate({_id:req.params.cartproid},imageData)
    .then(result=> res.json({"result":"image added to product","updatedproduct":result}))
    .catch(err=>res.status(404).json(err))
  })


router.post('/addproducttocart', order_controller.add_product_to_cart)

//GET request to get all users. 
router.post('/placeorder', order_controller.place_order);


router.get('/getorderbyid/:orderid', order_controller.get_order_by_id)

router.get('/getorderswithdata', order_controller.get_orders_with_data);

router.get('/getorders', order_controller.get_orders);

router.get('/getcartproductbyid/:cpid', order_controller.get_cartproduct_by_id)


// GET request to get specific order details. 
//  router.get('/order/:oid', order_controller.order_get_order);

 // GET request to get all users. 
//  router.get('/orders', order_controller.orders_get_orders);

// GET request for count of friends of a specific user. 
//  router.get('/countusers', user_controller.user_count_users);

 // GET request for count of friends of a specific user. 
//  router.delete('/deleteuser', user_controller.user_delete_user);

// GET request for count of friends requests of a specific user. 
 //router.put('/updateuser/:uid', user_controller.user_update_user);

module.exports = router