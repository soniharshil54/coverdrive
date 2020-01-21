const express = require("express")
const router = express.Router()
const multer = require("multer")
const Mug = require("../../models/mug")
const Keychain = require("../../models/keychain")
const Mainslide = require("../../models/mainslide")

var mug_controller = require('../../controllers/mugs');

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


router.put('/addimage/:mid',upload.fields([{name: 'hImage', maxCount: 1}, {
  name: 'inImage',maxCount: 1},{name: 'maskImage',maxCount: 1}]),(req,res,next) => {
  console.log(req.files)
  let imageData = {}
  if(req.files.hImage){
    imageData.h_image = req.files.hImage[0].originalname
  }
  if(req.files.inImage){
    imageData.in_image = req.files.inImage[0].originalname
  }
  if(req.files.maskImage){
    imageData.mask_image = req.files.maskImage[0].originalname
  }
  Mug.findOneAndUpdate({_id:req.params.mid},imageData)
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


router.get('/mugs', mug_controller.get_active_mugs)

router.get('/getmugbyidadmin/:mid', mug_controller.get_mug_by_id_admin)

router.get('/getallmugs', mug_controller.get_all_mugs)

router.put('/editmug/:mid', mug_controller.edit_mug)

router.put('/editmugstatus/:mid', mug_controller.edit_mug_status)

router.delete('/deletemug', mug_controller.delete_mugs)

router.post('/addmug', mug_controller.add_mug);
 


module.exports = router