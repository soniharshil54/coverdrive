const express = require("express")
const router = express.Router()
const mongoose = require("mongoose")
const multer = require("multer")
const Cartproduct = require("../../models/cartproduct")
const ObjectId = mongoose.Types.ObjectId

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
      fileSize: 2024 * 2024 * 6
    },
    fileFilter: fileFilter
  });

  router.post('/addproducttocart', upload.fields([{name: 'user_img_full', maxCount: 1},{name: 'user_img_cropped', maxCount: 1},{name: 'user_img_full_2', maxCount: 1},{name: 'user_img_cropped_2', maxCount: 1}]),async (req,res,next) => {
    console.log("product upload to cart")
    console.log(req.files)
    const newCartproduct = new Cartproduct(
        {
            _id: new mongoose.Types.ObjectId(),
            product_name: req.body.product_name,
            cover_4d_id : req.body.cover_4d_id ? req.body.cover_4d_id : "na",
            cover_type:  req.body.cover_type ? req.body.cover_type : "na",
            image: req.files.user_img_full ? req.files.user_img_full[0].originalname : "noimage.png",
            cropped_image: req.files.user_img_cropped ? req.files.user_img_cropped[0].originalname : "noimage.png",
            image_2: req.files.user_img_full_2 ? req.files.user_img_full_2[0].originalname : "noimage.png",
            cropped_image_2: req.files.user_img_cropped_2 ? req.files.user_img_cropped_2[0].originalname : "noimage.png",
            print_name : req.body.print_name ? req.body.print_name : "na",
            size: req.body.size ? req.body.size : "na",
            subtotal: req.body.subtotal,
            total: req.body.total,
            category: req.body.category,
            quantity : req.body.quantity ? req.body.quantity : 1
        }
    )
    let cartproduct = await newCartproduct.save()
    res.status(200).json({"cartproduct": cartproduct})
  })

  router.post('/addproducttocartold',upload.single('user_img'),async (req,res,next) => {
    console.log("product upload to cart")
    console.log(req.file)
    // console.log(req.body.proid)
    // let testproid = req.body.proid
    // let objstring = testproid.toString(testproid)
    // let cproid = new ObjectId(objstring)
    // let cproid = mongoose.Types.ObjectId.createFromHexString(req.body.proid)
    const newCartproduct = new Cartproduct(
        {
            _id: new mongoose.Types.ObjectId(),
            product_name: req.body.product_name,
            cover_4d_id : req.body.cover_4d_id ? req.body.cover_4d_id : "na",
            cover_type:  req.body.cover_type ? req.body.cover_type : "na",
            image: req.file ? req.file.originalname : "na",
            print_name : req.body.print_name ? req.body.print_name : "na",
            size: req.body.size ? req.body.size : "na",
            subtotal: req.body.subtotal,
            total: req.body.total,
            category: req.body.category,
            quantity : req.body.quantity ? req.body.quantity : 1
        }
    )
    let cartproduct = await newCartproduct.save()
    res.status(200).json({"cartproduct": cartproduct})
  })
  
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


//router.get('/neworderid', order_controller.get_next_order_id)

router.post('/addproducttocartold', order_controller.add_product_to_cart)



router.post('/addordercounter', order_controller.add_order_counter)
//GET request to get all users. 
router.post('/placeorder', order_controller.place_order);

router.get('/placemockorder', order_controller.place_mock_order);

router.post('/postpincodes', order_controller.post_pincodes);

router.get('/getpincodes', order_controller.get_pincodes);

router.put('/updatepincodes', order_controller.update_pincodes);

router.put('/updateallorders', order_controller.edit_all_orders);

router.post('/placemodelrequest', order_controller.place_model_request);

router.delete('/deleteorder', order_controller.delete_orders)

router.delete('/deactivateorder', order_controller.deactivate_orders)

router.put('/changeorderstatus/:oid', order_controller.change_order_status)

router.get('/getorderbyid/:orderid', order_controller.get_order_by_id)

router.get('/getorderbycustomid/:corderid', order_controller.get_order_by_custom_id)

router.get('/getordersbycontact/:contact', order_controller.get_orders_by_contact)

router.get('/getorderswithdata',checkAuth, order_controller.get_orders_with_data);

router.get('/getorderswithdataopt', order_controller.get_orders_with_data_optimized);

router.get('/getactiveorderswithdataopt', order_controller.get_active_orders_with_data_optimized);

router.get('/getactiveorderswithdataoptfilt/:filtertype/:filterparam', order_controller.get_active_orders_with_data_optimized_filtered);

router.get('/getactiveorderswithdata', order_controller.get_active_orders_with_data);

router.get('/getactiveorderswithdatafilt/:filtertype/:filterparam', order_controller.get_active_orders_with_data_filtered);

router.get('/getmodelrequests', order_controller.get_modelrequests)

router.delete('/deletemodelrequests', order_controller.delete_model_requests)

router.get('/getorders', order_controller.get_orders);

router.get('/getactiveorders', order_controller.get_active_orders);

//router.get('/setactiveorders', order_controller.set_active_orders);

router.get('/getcartproductbyid/:cpid', order_controller.get_cartproduct_by_id)

router.get('/getallcartproducts', order_controller.get_all_cartproducts)


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