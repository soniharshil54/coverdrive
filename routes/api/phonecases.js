const express = require("express")
const router = express.Router()
const multer = require("multer")
const Phonecase4d = require("../../models/phonecase4d")

var product_controller = require('../../controllers/products');
var phonecase_controller = require('../../controllers/phonecases')

const checkAuth = require("../../middlewares/checkAuth")

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './uploads/');
  },
  filename: function(req, file, cb) {
    let timestampref = Math.floor(Date.now() / 1000)
    let filenameref = file.originalname
    let trimmedfilename = filenameref.replace(/\s/g, "")
    let slidernameref = `${timestampref}-${trimmedfilename}`
    cb(null, slidernameref);
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
    fileSize: 2024 * 2024 * 8
  },
  fileFilter: fileFilter
});



// GET request to get specific user. 
//  router.get('/product/:pid', user_controller.user_get_user);

 // GET request to get all users. 
//  router.get('/products', user_controller.user_get_products);

 // GET request to get all users. 
 //router.post('/addproduct', product_controller.add_product);

 router.put('/addimage/:pid',upload.fields([{name: 'image_2d_slider', maxCount: 1},{name: 'image_2d_mask', maxCount: 1}, {name: 'image_2d_inner', maxCount: 1},{name: 'image_3d_slider', maxCount: 1},{name: 'image_3d_mask', maxCount: 1}, {name: 'image_3d_inner', maxCount: 1}, {name: 'image_4d_slider', maxCount: 1}]),(req,res,next) => {
  console.log(req.files)
  let imageData = {}
  if(req.files.image_2d_slider){
    imageData.image_header_2d = req.files.image_2d_slider[0].filename
  }
  if(req.files.image_2d_mask){
    imageData.image_mask_2d = req.files.image_2d_mask[0].filename
  }
  if(req.files.image_2d_inner){
    imageData.image_inner_2d = req.files.image_2d_inner[0].filename
  }
  if(req.files.image_3d_slider){
    imageData.image_header_3d = req.files.image_3d_slider[0].filename
  }
  if(req.files.image_3d_inner){
    imageData.image_inner_3d = req.files.image_3d_inner[0].filename
  }
  if(req.files.image_3d_mask){
    imageData.image_mask_3d = req.files.image_3d_mask[0].filename
  }
  if(req.files.image_4d_slider){
    imageData.image_header_4d = req.files.image_4d_slider[0].filename
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


router.put('/edit4dphonecase/:mid',upload.fields([{name: 'image_4d_slider', maxCount: 1},{name: 'image_4d_cover', maxCount: 1}, {name: 'image_4d_mask', maxCount: 1}]),(req,res,next) => {
  console.log(req.files)
  let imageData = {}
  if(req.files.image_4d_slider){
    imageData.image_header_2d = req.files.image_4d_slider[0].filename
  }
  if(req.files.image_4d_cover){
    imageData.image_mask_2d = req.files.image_4d_cover[0].filename
  }
  if(req.files.image_4d_mask){
    imageData.image_inner_2d = req.files.image_4d_mask[0].filename
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

router.put('/add4dphonecaseimages/:pid',upload.fields([{name: 'slider_image', maxCount: 1},{name: 'header_image', maxCount: 1}, {name: 'png_image', maxCount: 1}, {name: 'inner_image', maxCount: 1}, {name: 'mask_image', maxCount: 1}]),(req,res,next) => {
  console.log("upload images 4d called")
  //console.log(req.files)
  let imageData = {}
  if(req.files.slider_image){
    imageData.slider_image = req.files.slider_image[0].filename
  }
  if(req.files.header_image){
    imageData.header_image = req.files.header_image[0].filename
  }
  if(req.files.png_image){
    imageData.png_image = req.files.png_image[0].filename
  }
  if(req.files.inner_image){
    imageData.inner_image = req.files.inner_image[0].filename
  }
  if(req.files.mask_image){
    imageData.mask_image = req.files.mask_image[0].filename
  }
  console.log("below data")
  console.log(imageData)
  Phonecase4d.findOneAndUpdate({_id:req.params.pid},imageData)
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

router.put('/add3dphonecaseimages/:pid',upload.fields([{name: 'slider_image', maxCount: 1},{name: 'header_image', maxCount: 1}]),(req,res,next) => {
  console.log("upload images 3d called")
  //console.log(req.files)
  let imageData = {}
  imageData.name = req.body.cover_name
  if(req.files.slider_image){
    imageData.slider_image = req.files.slider_image[0].filename
  }
  if(req.files.header_image){
    imageData.header_image = req.files.header_image[0].filename
  }
  console.log("below data")
  console.log(imageData)
  Phonecase3d.findOneAndUpdate({_id:req.params.pid},imageData)
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

router.put('/updateall4dphonecases',upload.fields([{name: 'slider_image', maxCount: 1},{name: 'header_image', maxCount: 1}, {name: 'png_image', maxCount: 1}, {name: 'inner_image', maxCount: 1}, {name: 'mask_image', maxCount: 1}]),(req,res,next) => {
  console.log(req.files)
  let imageData = {}
  // if(req.files.slider_image){
  //   imageData.slider_image = req.files.slider_image[0].filename
  // }
  // if(req.files.header_image){
  //   imageData.header_image = req.files.header_image[0].filename
  // }
  // if(req.files.png_image){
  //   imageData.png_image = req.files.png_image[0].filename
  // }
  // if(req.files.inner_image){
  //   imageData.inner_image = req.files.inner_image[0].filename
  // }
  // if(req.files.mask_image){
  //   imageData.mask_image = req.files.mask_image[0].filename
  // }
  console.log("below data")
  console.log(imageData)
  Phonecase4d.updateMany({},req.body)
  .then(result=> {
    //console.log(result)
    res.json({"result":"4d phonecase updated","updated4dcover":result})
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

  router.get('/companies', phonecase_controller.get_active_companies)

  router.get('/activecompanies', phonecase_controller.get_active_companies)

  router.get('/allcompanies', phonecase_controller.get_all_companies)

  router.get('/getphonecases', phonecase_controller.get_phonecases)

  router.get('/getallphonecases', phonecase_controller.get_all_phonecases)

  router.get('/getall4dphonecases', phonecase_controller.get_all_4d_phonecases)

  router.put('/editall4dphonecases', phonecase_controller.edit_all_4d_phonecases)

  router.get('/get4dphonecasebyid/:id',phonecase_controller.get_4d_phonecase_by_id)

  router.get('/get4dcoversbymodel/:model_id', phonecase_controller.get_4dcovers_by_model)

  router.get('/get4dcoversbymodel2/:model_id', phonecase_controller.get_4dcovers_by_model_2)

  router.get('/get4dcoversbycompany/:company', phonecase_controller.get_4dcovers_by_company)

  router.get('/get4dcoversbycompany3/:company', phonecase_controller.get_4dcovers_by_company_3)

  router.delete('/delete4dphonecase', phonecase_controller.delete_4d_phonecases)

  router.put('/edit4dphonecasestatus/:eid', phonecase_controller.edit_4d_phonecase_status)

  router.post('/add4dphonecase/:modelid', phonecase_controller.add_4d_phonecase);


  router.get('/getall3dphonecases', phonecase_controller.get_all_3d_phonecases)

  router.put('/editall3dphonecases', phonecase_controller.edit_all_3d_phonecases)

  router.get('/get3dphonecasebyid/:id',phonecase_controller.get_3d_phonecase_by_id)

  router.get('/get3dcoversbymodel/:model_id', phonecase_controller.get_3dcovers_by_model)

  router.get('/get3dcoversbymodel2/:model_id', phonecase_controller.get_3dcovers_by_model_2)

  router.get('/get3dcoversbycompany/:company', phonecase_controller.get_3dcovers_by_company)

  router.get('/get3dcoversbycompany3/:company', phonecase_controller.get_3dcovers_by_company_3)

  router.delete('/delete3dphonecase', phonecase_controller.delete_3d_phonecases)

  router.put('/edit3dphonecasestatus/:eid', phonecase_controller.edit_3d_phonecase_status)

  router.post('/add3dphonecase/:modelid', phonecase_controller.add_3d_phonecase);


  router.get('/getphonecasebyid/:id',phonecase_controller.get_phonecase_by_id)

  

  router.get('/getphonecasebyidadmin/:pid',phonecase_controller.get_phonecase_by_id_admin)

  router.get('/getphonecasesbycompany/:company', phonecase_controller.get_phonecases_by_company)

  router.get('/getmodelsbycompany/:company', phonecase_controller.get_models_by_company)

  router.get('/getmodelsbycompanyid/:cid', phonecase_controller.get_models_by_company_id)

 

  //router.get('/get4dcoversbycompany2/:company', phonecase_controller.get_4dcovers_by_company_2)

  // router.get('/getmodelsbycompany3/:company', phonecase_controller.get_models_by_company_3)

  router.post('/addphonecase', phonecase_controller.add_phonecase);

  //router.post('/addphonecase', phonecase_controller.add_phonecase);



  //router.get('/get4dphonecases/:modelid', phonecase_controller.get_4d_phonecases);

  router.post('/addphonecase', phonecase_controller.add_phonecase);

  router.delete('/deletephonecase', phonecase_controller.delete_phonecases)



  router.delete('/deletecompany', phonecase_controller.delete_companies)

  router.put('/editphonecase/:eid', phonecase_controller.edit_phonecase)

  router.put('/editphonecasestatus/:eid', phonecase_controller.edit_phonecase_status)



  router.put('/editcompany/:cid', phonecase_controller.edit_company)

  router.put('/editcompanyname/:cid', phonecase_controller.edit_company_name)

  router.put('/editallphonecases', phonecase_controller.edit_all_phonecases)

  

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