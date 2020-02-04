const express = require("express")
const router = express.Router()
const multer = require("multer")
const Wallclock = require("../../models/wallclock")
const Keychain = require("../../models/keychain")
const Mainslide = require("../../models/mainslide")

var wallclock_controller = require('../../controllers/wallclocks');

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
    fileSize: 2024 * 2024 * 6
  },
  fileFilter: fileFilter
});


// router.put('/wtaddimage/:wtid',upload.fields([{name: 'sliderImage', maxCount: 1}]),(req,res,next) => {
//   console.log(req.files)
//   console.log("wt images")
//   let imageData = {}
//   if(req.files.sliderImage){
//     imageData.slider_image = req.files.sliderImage[0].originalname
//   }
//   Wallclocktype.findOneAndUpdate({_id:req.params.wtid},imageData)
//   .then(result=> {
//     //console.log(result)
//     res.json({"result":"wallclock type image updated","updatedwallclocktype":result})
//   })
//   .catch(err=>{
//     console.log(err)
//     res.status(404).json(err)
//   }
//     )
// })

router.put('/addimage/:pid',upload.fields([{name: 'hImage', maxCount: 1}, {
  name: 'shadowImage',maxCount: 1},{name: 'overlayImage',maxCount: 1},{name: 'maskImage',maxCount: 1}]),(req,res,next) => {
  console.log(req.files)
  let imageData = {}
  if(req.files.hImage){
    imageData.h_image = req.files.hImage[0].originalname
  }
  if(req.files.shadowImage){
    imageData.shadow_image = req.files.shadowImage[0].originalname
  }
  if(req.files.overlayImage){
    imageData.overlay_image = req.files.overlayImage[0].originalname
  }
  if(req.files.maskImage){
    imageData.mask_image = req.files.maskImage[0].originalname
  }
  Wallclock.findOneAndUpdate({_id:req.params.pid},imageData)
  .then(result=> {
    //console.log(result)
    res.json({"result":"wallclock image updated","updatedwallclock":result})
  })
  .catch(err=>{
    console.log(err)
    res.status(404).json(err)
  }
    )
})


// router.post('/addtype', wallclock_controller.add_wallclock_type);

// router.get('/getallwallclocktypes', wallclock_controller.get_all_wallclock_types)

// router.get('/getwallclocktypes', wallclock_controller.get_active_wallclock_types)

// router.get('/getktbyidadmin/:ktid', wallclock_controller.get_kt_by_id_admin)

// router.put('/editwallclocktype/:ktid', wallclock_controller.edit_wallclock_type)

// router.put('/editktypestatus/:ktid', wallclock_controller.edit_ktype_status)

router.get('/wallclocks', wallclock_controller.get_active_wallclocks)

router.get('/getallwallclocknames', wallclock_controller.get_all_wallclock_names)

router.get('/getwallclockbyidadmin/:mid', wallclock_controller.get_wallclock_by_id_admin)

router.get('/getwallclockbyid/:mid', wallclock_controller.get_wallclock_by_id)

router.get('/getallwallclocks', wallclock_controller.get_all_wallclocks)

router.put('/editwallclock/:mid', wallclock_controller.edit_wallclock)

router.put('/editallwallclocks', wallclock_controller.edit_all_wallclocks)

router.put('/editwallclockstatus/:mid', wallclock_controller.edit_wallclock_status)

router.delete('/deletewallclock', wallclock_controller.delete_wallclocks)

router.post('/addwallclock', wallclock_controller.add_wallclock);
 


module.exports = router