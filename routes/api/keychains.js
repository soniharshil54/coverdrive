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
    let timestampref = Math.floor(Date.now() / 1000)
    let slidernameref = `${timestampref}-${file.originalname}`
    cb(null, slidernameref);
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
    fileSize: 2024 * 2024 * 6
  },
  fileFilter: fileFilter
});


router.put('/ktaddimage/:ktid',upload.fields([{name: 'sliderImage', maxCount: 1}]),(req,res,next) => {
    console.log(req.files)
    console.log("kt images")
    let imageData = {}
    if(req.files.sliderImage){
      imageData.slider_image = req.files.sliderImage[0].filename
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

  router.put('/addimage/:kid',upload.fields([{name: 'hImage', maxCount: 1}, {
    name: 'inImage',maxCount: 1},{name: 'overlayImage',maxCount: 1},{name: 'maskImage',maxCount: 1}]),(req,res,next) => {
    console.log(req.files)
    let imageData = {}
    if(req.files.hImage){
      imageData.h_image = req.files.hImage[0].filename
    }
    if(req.files.inImage){
      imageData.shadow_image = req.files.inImage[0].filename
    }
    if(req.files.overlayImage){
      imageData.overlay_image = req.files.overlayImage[0].filename
    }
    if(req.files.maskImage){
      imageData.mask_image = req.files.maskImage[0].filename
    }
    Keychain.findOneAndUpdate({_id:req.params.kid},imageData)
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

  router.post('/addtype', keychain_controller.add_keychain_type);

  router.get('/getallkeychaintypes', keychain_controller.get_all_keychain_types)

  router.get('/getkeychaintypes', keychain_controller.get_active_keychain_types)

router.get('/getktbyidadmin/:ktid', keychain_controller.get_kt_by_id_admin)

router.put('/editkeychaintype/:ktid', keychain_controller.edit_keychain_type)

router.put('/editktypestatus/:ktid', keychain_controller.edit_ktype_status)

router.get('/keychains', keychain_controller.get_active_keychains)

router.get('/getallkeychainnames', keychain_controller.get_all_keychain_names)

router.get('/getkeychainbyidadmin/:mid', keychain_controller.get_keychain_by_id_admin)

router.get('/getkeychainbyid/:mid', keychain_controller.get_keychain_by_id)

router.get('/getkeychainsbytype/:ktid', keychain_controller.get_keychains_by_type)

router.get('/getallkeychains', keychain_controller.get_all_keychains)

router.put('/editkeychain/:mid', keychain_controller.edit_keychain)

router.put('/editallkeychains', keychain_controller.edit_all_keychains)

router.put('/editkeychainstatus/:mid', keychain_controller.edit_keychain_status)

router.delete('/deletekeychain', keychain_controller.delete_keychains)

router.post('/addkeychain', keychain_controller.add_keychain);




 


module.exports = router