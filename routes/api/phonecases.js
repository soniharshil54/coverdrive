const express = require("express")
const router = express.Router()
const multer = require("multer")

var product_controller = require('../../controllers/products');
var phonecase_controller = require('../../controllers/phonecases')

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

 router.put('/addimage/:pid',upload.fields([{name: 'image_2d_slider', maxCount: 1}, {name: 'image_2d_inner', maxCount: 1},{name: 'image_3d_slider', maxCount: 1}, {name: 'image_3d_inner', maxCount: 1}]),(req,res,next) => {
  console.log(req.files)
  let imageData = {}
  if(req.files.image_2d_slider){
    imageData.image_header_2d = req.files.image_2d_slider[0].originalname
  }
  if(req.files.image_2d_inner){
    imageData.image_inner_2d = req.files.image_2d_inner[0].originalname
  }
  if(req.files.image_3d_slider){
    imageData.image_header_3d = req.files.image_3d_slider[0].originalname
  }
  if(req.files.image_3d_inner){
    imageData.image_inner_3d = req.files.image_3d_inner[0].originalname
  }
  if(req.files.image_4d_slider){
    imageData.image_header_4d = req.files.image_4d_slider[0].originalname
  }
  console.log("below data")
  console.log(imageData)
  Phonecase.findOneAndUpdate({_id:req.params.pid},imageData)
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
  router.post('/addcompany', phonecase_controller.add_company);

  router.delete('/deletecompany/:cid', phonecase_controller.delete_company);

  router.get('/companies', phonecase_controller.get_companies)

  router.get('/getphonecases', phonecase_controller.get_phonecases)

  router.get('/getphonecasebyid/:id',phonecase_controller.get_phonecase_by_id)

  router.get('/getphonecasesbycompany/:company', phonecase_controller.get_phonecases_by_company)

  router.get('/get4dcoversbymodel/:model_id', phonecase_controller.get_4dcovers_by_model)

  router.get('/get4dcoversbycompany/:company', phonecase_controller.get_4dcovers_by_company)

  router.get('/getmodelsbycompany/:company', phonecase_controller.get_models_by_company)

  router.post('/addphonecase', phonecase_controller.add_phonecase);

  router.post('/add4dphonecase/:modelid', phonecase_controller.add_4d_phonecase);

  //router.get('/get4dphonecases/:modelid', phonecase_controller.get_4d_phonecases);

  router.post('/addphonecase', phonecase_controller.add_phonecase);

  router.delete('/deletephonecase', phonecase_controller.delete_phonecases)

  router.put('/editphonecase/:eid', phonecase_controller.edit_phonecase)

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