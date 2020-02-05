const express = require("express")
const router = express.Router()
const multer = require("multer")
const Photoframe = require("../../models/photoframe")
const Keychain = require("../../models/keychain")
const Mainslide = require("../../models/mainslide")

var photoframe_controller = require('../../controllers/photoframes');

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
    fileSize: 1024 * 1024 * 6
  },
  fileFilter: fileFilter
});


router.put('/ptaddimage/:ptid',upload.fields([{name: 'sliderImage', maxCount: 1}]),(req,res,next) => {
    console.log(req.files)
    console.log("pt images")
    let imageData = {}
    if(req.files.sliderImage){
      imageData.slider_image = req.files.sliderImage[0].filename
    }
    Photoframetype.findOneAndUpdate({_id:req.params.ptid},imageData)
    .then(result=> {
      //console.log(result)
      res.json({"result":"photoframe type image updated","updatedphotoframetype":result})
    })
    .catch(err=>{
      console.log(err)
      res.status(404).json(err)
    }
      )
  })

router.put('/addimage/:pid',upload.fields([{name: 'hImage', maxCount: 1}, {
  name: 'shadowImage',maxCount: 1},{name: 'overlayImage',maxCount: 1},{name: 'maskImage',maxCount: 1}]),(req,res,next) => {
  console.log(req.files)
  let imageData = {}
  if(req.files.hImage){
    imageData.h_image = req.files.hImage[0].filename
  }
  if(req.files.shadowImage){
    imageData.shadow_image = req.files.shadowImage[0].filename
  }
  if(req.files.overlayImage){
    imageData.overlay_image = req.files.overlayImage[0].filename
  }
  if(req.files.maskImage){
    imageData.mask_image = req.files.maskImage[0].filename
  }
  Photoframe.findOneAndUpdate({_id:req.params.pid},imageData)
  .then(result=> {
    //console.log(result)
    res.json({"result":"photoframe image updated","updatedphotoframe":result})
  })
  .catch(err=>{
    console.log(err)
    res.status(404).json(err)
  }
    )
})

router.post('/addtype', photoframe_controller.add_photoframe_type);

router.get('/getallphotoframetypes', photoframe_controller.get_all_photoframe_types)

router.get('/getallphotoframenames', photoframe_controller.get_all_photoframe_names)

router.get('/getphotoframesbytypeid/:typeid', photoframe_controller.get_photoframes_by_typeid)

router.get('/getphotoframetypes', photoframe_controller.get_active_photoframe_types)

router.get('/getptbyidadmin/:ptid', photoframe_controller.get_pt_by_id_admin)

router.put('/editphotoframetype/:ptid', photoframe_controller.edit_photoframe_type)

router.put('/editptypestatus/:ptid', photoframe_controller.edit_ptype_status)

router.get('/photoframes', photoframe_controller.get_active_photoframes)

router.get('/getphotoframebyidadmin/:mid', photoframe_controller.get_photoframe_by_id_admin)

router.get('/getphotoframebyid/:mid', photoframe_controller.get_photoframe_by_id)

router.get('/getallphotoframes', photoframe_controller.get_all_photoframes)

router.put('/editphotoframe/:mid', photoframe_controller.edit_photoframe)

router.put('/editallphotoframes', photoframe_controller.edit_all_photoframes)

router.put('/editphotoframestatus/:mid', photoframe_controller.edit_photoframe_status)

router.delete('/deletephotoframe', photoframe_controller.delete_photoframes)

router.delete('/deletephotoframetypes', photoframe_controller.delete_photoframe_types)

router.post('/addphotoframe', photoframe_controller.add_photoframe);
 


module.exports = router