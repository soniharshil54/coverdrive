const express = require("express")
const router = express.Router()
const multer = require("multer")
const Keychain = require("../../models/keychain")
const Mainslide = require("../../models/mainslide")

var product_controller = require('../../controllers/products');

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

router.put('/addslider/:pid',upload.single('modal_slider_image'),(req,res,next) => {
  console.log("below file")
  console.log(req.file)
  console.log(req.params.pid)
  let imageData = {}
  if(req.file){
    imageData.slider_image = req.file.originalname
  }
  Mainslide.findOneAndUpdate({_id:req.params.pid},imageData)
  .then(result=> res.json({"result":"keychain image updated","updatedkeychain":result}))
  .catch(err=>res.status(404).json(err))
})



router.put('/keychain/addimage/:pid',upload.fields([{name: 'hImage', maxCount: 1}, {
  name: 'inImage', maxCount: 1
}]),(req,res,next) => {
  console.log(req.files)
  let imageData = {}
  if(req.files.hImage){
    imageData.h_image = req.files.hImage[0].originalname
  }
  if(req.files.inImage){
    imageData.in_image = req.files.inImage[0].originalname
  }
  Keychain.findOneAndUpdate({_id:req.params.pid},imageData)
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

router.put('/photoframe/addimage/:pid',upload.fields([{name: 'hImage', maxCount: 1}, {
  name: 'inImage', maxCount: 1
}]),(req,res,next) => {
  console.log(req.files)
  let imageData = {}
  if(req.files.hImage){
    imageData.h_image = req.files.hImage[0].originalname
  }
  if(req.files.inImage){
    imageData.in_image = req.files.inImage[0].originalname
  }
  Photoframe.findOneAndUpdate({_id:req.params.pid},imageData)
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

router.put('/editsliderstatus/:sid', product_controller.edit_slider_status)

router.put('/mug/addimage/:pid',upload.fields([{name: 'hImage', maxCount: 1}, {
  name: 'inImage', maxCount: 1
}]),(req,res,next) => {
  console.log(req.files)
  let imageData = {}
  if(req.files.hImage){
    imageData.h_image = req.files.hImage[0].originalname
  }
  if(req.files.inImage){
    imageData.in_image = req.files.inImage[0].originalname
  }
  Mug.findOneAndUpdate({_id:req.params.pid},imageData)
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

router.put('/popholder/addimage/:pid',upload.fields([{name: 'hImage', maxCount: 1}, {
  name: 'inImage', maxCount: 1
}]),(req,res,next) => {
  console.log(req.files)
  let imageData = {}
  if(req.files.hImage){
    imageData.h_image = req.files.hImage[0].originalname
  }
  if(req.files.inImage){
    imageData.in_image = req.files.inImage[0].originalname
  }
  Popholder.findOneAndUpdate({_id:req.params.pid},imageData)
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

router.put('/watch/addimage/:pid',upload.fields([{name: 'hImage', maxCount: 1}, {
  name: 'inImage', maxCount: 1
}]),(req,res,next) => {
  console.log(req.files)
  let imageData = {}
  if(req.files.hImage){
    imageData.h_image = req.files.hImage[0].originalname
  }
  if(req.files.inImage){
    imageData.in_image = req.files.inImage[0].originalname
  }
  Watch.findOneAndUpdate({_id:req.params.pid},imageData)
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

router.put('/wallclock/addimage/:pid',upload.fields([{name: 'hImage', maxCount: 1}, {
  name: 'inImage', maxCount: 1
}]),(req,res,next) => {
  console.log(req.files)
  let imageData = {}
  if(req.files.hImage){
    imageData.h_image = req.files.hImage[0].originalname
  }
  if(req.files.inImage){
    imageData.in_image = req.files.inImage[0].originalname
  }
  Wallclock.findOneAndUpdate({_id:req.params.pid},imageData)
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

router.put('/slipperbottle/addimage/:pid',upload.fields([{name: 'hImage', maxCount: 1}, {
  name: 'inImage', maxCount: 1
}]),(req,res,next) => {
  console.log(req.files)
  let imageData = {}
  if(req.files.hImage){
    imageData.h_image = req.files.hImage[0].originalname
  }
  if(req.files.inImage){
    imageData.in_image = req.files.inImage[0].originalname
  }
  Slipperbottle.findOneAndUpdate({_id:req.params.pid},imageData)
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


router.get('/sliders', product_controller.get_sliders)

router.get('/keychains', product_controller.get_keychains)

router.get('/mugs', product_controller.get_mugs)

router.get('/watchs', product_controller.get_watches)

router.get('/slipperbottles', product_controller.get_slipperbottles)

router.get('/wallclocks', product_controller.get_wallclocks)

router.get('/popholders', product_controller.get_popholders)

router.get('/photoframes', product_controller.get_photoframes)

router.put('/edit/keychain/:kid', product_controller.edit_keychain)

router.put('/edit/mug/:kid', product_controller.edit_mug)

router.put('/edit/popholder/:kid', product_controller.edit_popholder)

router.put('/edit/watch/:kid', product_controller.edit_watch)

router.put('/edit/wallclock/:kid', product_controller.edit_wallclock)

router.put('/edit/photoframe/:kid', product_controller.edit_photoframe)

router.put('/edit/slipperbottle/:kid', product_controller.edit_slipperbottle)

router.delete('/delete/keychain', product_controller.delete_keychains)

router.delete('/delete/mug', product_controller.delete_mugs)

router.delete('/delete/popholder', product_controller.delete_popholders)

router.delete('/delete/photoframe', product_controller.delete_photoframes)

router.delete('/delete/watch', product_controller.delete_watches)

router.delete('/delete/wallclock', product_controller.delete_wallclocks)

router.delete('/delete/slipperbottle', product_controller.delete_slipperbottles)



router.post('/add/keychain', product_controller.add_keychain);

router.post('/add/mug', product_controller.add_mug);

router.post('/addproduct', product_controller.add_product_slide)

//router.post('/add/popholder', product_controller.add_popholder);

//router.post('/addmug', product_controller.add_mug);

router.post('/addslide/:productname',product_controller.add_slider)

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