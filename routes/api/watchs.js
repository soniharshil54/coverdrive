const express = require("express")
const router = express.Router()
const multer = require("multer")
const Watch = require("../../models/watch")
const Watchtype = require("../../models/watchtype")
const Mainslide = require("../../models/mainslide")

var watch_controller = require('../../controllers/watchs');

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


router.put('/wmtaddimage/:wmtid',upload.fields([{name: 'sliderImage', maxCount: 1}]),(req,res,next) => {
  console.log(req.files)
  console.log("wmt images")
  let imageData = {}
  if(req.files.sliderImage){
    imageData.slider_image = req.files.sliderImage[0].originalname
  }
  Watchmaintype.findOneAndUpdate({_id:req.params.wmtid},imageData)
  .then(result=> {
    //console.log(result)
    res.json({"result":"watch maintype image updated","updatedwatchmaintype":result})
  })
  .catch(err=>{
    console.log(err)
    res.status(404).json(err)
  }
    )
})

router.put('/wtaddimage/:wtid',upload.fields([{name: 'sliderImage', maxCount: 1}]),(req,res,next) => {
    console.log(req.files)
    console.log("wt images")
    let imageData = {}
    if(req.files.sliderImage){
      imageData.slider_image = req.files.sliderImage[0].originalname
    }
    Watchtype.findOneAndUpdate({_id:req.params.wtid},imageData)
    .then(result=> {
      //console.log(result)
      res.json({"result":"watch type image updated","updatedwatchtype":result})
    })
    .catch(err=>{
      console.log(err)
      res.status(404).json(err)
    }
      )
  })

  router.put('/addimage/:kid',upload.fields([{name: 'hImage', maxCount: 1}, {
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
    Watch.findOneAndUpdate({_id:req.params.kid},imageData)
    .then(result=> {
      //console.log(result)
      res.json({"result":"watch image updated","updatedwatch":result})
    })
    .catch(err=>{
      console.log(err)
      res.status(404).json(err)
    }
      )
  })

  router.post('/addtype', watch_controller.add_watch_type);

  router.post('/addsubtype', watch_controller.add_watch_sub_type);

  router.get('/getallwatchtypes', watch_controller.get_all_watch_types)

  router.get('/getwatchtypes', watch_controller.get_active_watch_types)

router.get('/getwtbyidadmin/:wtid', watch_controller.get_wt_by_id_admin)

router.get('/getwmtbyidadmin/:wmtid', watch_controller.get_wmt_by_id_admin)

router.put('/editwatchtype/:wtid', watch_controller.edit_watch_type)

router.put('/editwatchmaintype/:wmtid', watch_controller.edit_watch_maintype)

router.put('/editwtypestatus/:wtid', watch_controller.edit_wtype_status)

router.get('/editaddwatchtypename', watch_controller.edit_add_watch_type_name)


router.get('/getallwatchmaintypes', watch_controller.get_all_watch_main_types)

router.get('/getwatchmaintypesbytypeid/:typeid', watch_controller.get_all_watch_main_types_by_typeid)

router.get('/getwatchesbymaintypeid/:mtypeid', watch_controller.get_watches_by_main_typeid)

//router.get('/getwatchtypes', watch_controller.get_active_watch_types)

//router.get('/getwtbyidadmin/:wtid', watch_controller.get_wt_by_id_admin)

//router.put('/editmainwatchtype/:wtid', watch_controller.edit_main_watch_type)

router.put('/editwmtypestatus/:wmtid', watch_controller.edit_wmaintype_status)


router.get('/watchs', watch_controller.get_active_watchs)

router.get('/deletewatchmaintyperan',watch_controller.delete_watchmaintypes)

router.get('/getwatchbyidadmin/:mid', watch_controller.get_watch_by_id_admin)

router.get('/getwatchbyid/:mid', watch_controller.get_watch_by_id)

router.get('/getwatchsbytype/:wtid', watch_controller.get_watchs_by_type)

router.get('/getallwatchs', watch_controller.get_all_watchs)

router.put('/editwatch/:mid', watch_controller.edit_watch)

router.put('/editallwatchs', watch_controller.edit_all_watchs)

router.put('/editwatchstatus/:mid', watch_controller.edit_watch_status)

router.delete('/deletewatch', watch_controller.delete_watchs)

router.delete('/deletewatchtypes', watch_controller.delete_watch_types)

router.post('/addwatch', watch_controller.add_watch);




 


module.exports = router