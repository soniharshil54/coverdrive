const express = require("express")
const router = express.Router()
const multer = require("multer")
const Sipperbottle = require("../../models/sipperbottle")
const Keychain = require("../../models/keychain")
const Mainslide = require("../../models/mainslide")

var sipperbottle_controller = require('../../controllers/sipperbottles');

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


router.put('/addimage/:mid',upload.fields([{name: 'hImage', maxCount: 1}, {
  name: 'inImage',maxCount: 1},{name: 'overlayImage',maxCount: 1},{name: 'maskImage',maxCount: 1}]),(req,res,next) => {
  console.log(req.files)
  let imageData = {}
  if(req.files.hImage){
    imageData.h_image = req.files.hImage[0].originalname
  }
  if(req.files.inImage){
    imageData.in_image = req.files.inImage[0].originalname
  }
  if(req.files.overlayImage){
    imageData.overlay_image = req.files.overlayImage[0].originalname
  }
  if(req.files.maskImage){
    imageData.mask_image = req.files.maskImage[0].originalname
  }
  Sipperbottle.findOneAndUpdate({_id:req.params.mid},imageData)
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


router.get('/getallsipperbottlenames', sipperbottle_controller.get_all_sipperbottle_names)

router.get('/sipperbottles', sipperbottle_controller.get_active_sipperbottles)

router.get('/getsipperbottlebyidadmin/:mid', sipperbottle_controller.get_sipperbottle_by_id_admin)

router.get('/getsipperbottlebyid/:mid', sipperbottle_controller.get_sipperbottle_by_id)

router.get('/getallsipperbottles', sipperbottle_controller.get_all_sipperbottles)

router.put('/editsipperbottle/:mid', sipperbottle_controller.edit_sipperbottle)

router.put('/editallsipperbottles', sipperbottle_controller.edit_all_sipperbottles)

router.put('/editsipperbottlestatus/:mid', sipperbottle_controller.edit_sipperbottle_status)

router.delete('/deletesipperbottle', sipperbottle_controller.delete_sipperbottles)

router.post('/addsipperbottle', sipperbottle_controller.add_sipperbottle);
 


module.exports = router