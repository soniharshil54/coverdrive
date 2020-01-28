const express = require("express")
const router = express.Router()
const multer = require("multer")
const Popholder = require("../../models/popholder")
const Keychain = require("../../models/keychain")
const Mainslide = require("../../models/mainslide")

var popholder_controller = require('../../controllers/popholders');

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
  Popholder.findOneAndUpdate({_id:req.params.pid},imageData)
  .then(result=> {
    //console.log(result)
    res.json({"result":"popholder image updated","updatedpopholder":result})
  })
  .catch(err=>{
    console.log(err)
    res.status(404).json(err)
  }
    )
})

router.post('/addtype', popholder_controller.add_popholder_type);

router.get('/getallpopholdertypes', popholder_controller.get_all_popholder_types)

router.get('/getpopholdersbytypeid/:typeid', popholder_controller.get_popholders_by_typeid)

router.get('/getpopholdertypes', popholder_controller.get_active_popholder_types)

router.get('/getptbyidadmin/:ptid', popholder_controller.get_pt_by_id_admin)

router.put('/editpopholdertype/:ptid', popholder_controller.edit_popholder_type)

router.put('/editptypestatus/:ptid', popholder_controller.edit_ptype_status)

router.get('/popholders', popholder_controller.get_active_popholders)

router.get('/getpopholderbyidadmin/:mid', popholder_controller.get_popholder_by_id_admin)

router.get('/getpopholderbyid/:mid', popholder_controller.get_popholder_by_id)

router.get('/getallpopholders', popholder_controller.get_all_popholders)

router.put('/editpopholder/:mid', popholder_controller.edit_popholder)

router.put('/editallpopholders', popholder_controller.edit_all_popholders)

router.put('/editpopholderstatus/:mid', popholder_controller.edit_popholder_status)

router.delete('/deletepopholder', popholder_controller.delete_popholders)

router.post('/addpopholder', popholder_controller.add_popholder);
 


module.exports = router