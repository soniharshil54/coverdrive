const express = require("express")
const router = express.Router()
const multer = require("multer")
const Keychain = require("../../models/keychain")
const Keychaintype = require("../../models/keychaintype")
const Mainslide = require("../../models/mainslide")

var keychain_controller = require('../../controllers/keychains');

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
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/webp' || file.mimetype === 'image/jpg') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 6
  },
  fileFilter: fileFilter
});


// router.put('/addimage/:mid',upload.fields([{name: 'hImage', maxCount: 1}, {
//   name: 'inImage',maxCount: 1},{name: 'overlayImage',maxCount: 1},{name: 'maskImage',maxCount: 1}]),(req,res,next) => {
//   console.log(req.files)
//   let imageData = {}
//   if(req.files.hImage){
//     imageData.h_image = req.files.hImage[0].originalname
//   }
//   if(req.files.inImage){
//     imageData.in_image = req.files.inImage[0].originalname
//   }
//   if(req.files.overlayImage){
//     imageData.overlay_image = req.files.overlayImage[0].originalname
//   }
//   if(req.files.maskImage){
//     imageData.mask_image = req.files.maskImage[0].originalname
//   }
//   Mug.findOneAndUpdate({_id:req.params.mid},imageData)
//   .then(result=> {
//     //console.log(result)
//     res.json({"result":"keychain image updated","updatedkeychain":result})
//   })
//   .catch(err=>{
//     console.log(err)
//     res.status(404).json(err)
//   }
//     )
// })

router.put('/ktaddimage/:ktid',upload.fields([{name: 'sliderImage', maxCount: 1}]),(req,res,next) => {
    console.log(req.files)
    console.log("kt images")
    let imageData = {}
    if(req.files.sliderImage){
      imageData.slider_image = req.files.sliderImage[0].originalname
    }
    Keychaintype.findOneAndUpdate({_id:req.params.ktid},imageData)
    .then(result=> {
      //console.log(result)
      res.json({"result":"keychain type image updated","updatedkeychaintype":result})
    })
    .catch(err=>{
      console.log(err)
      res.status(404).json(err)
    }
      )
  })

  router.post('/addtype', keychain_controller.add_keychain_type);

  router.get('/getallkeychaintypes', keychain_controller.get_all_keychain_types)

// router.get('/mugs', mug_controller.get_active_mugs)

router.get('/getktbyidadmin/:ktid', keychain_controller.get_kt_by_id_admin)

router.put('/editkeychaintype/:ktid', keychain_controller.edit_keychain_type)

router.put('/editktypestatus/:ktid', keychain_controller.edit_ktype_status)

// router.get('/getmugbyid/:mid', mug_controller.get_mug_by_id)

// router.get('/getallmugs', mug_controller.get_all_mugs)

// router.put('/editmug/:mid', mug_controller.edit_mug)

// router.put('/editallmugs', mug_controller.edit_all_mugs)

// router.put('/editmugstatus/:mid', mug_controller.edit_mug_status)

// router.delete('/deletemug', mug_controller.delete_mugs)


 


module.exports = router