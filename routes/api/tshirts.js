const express = require("express")
const router = express.Router()
const multer = require("multer")
const Tshirt = require("../../models/tshirt")
const Tshirttype = require("../../models/tshirttype")
const Mainslide = require("../../models/mainslide")

var tshirt_controller = require('../../controllers/tshirts');

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

const uploadmultiple = multer({ storage : storage, fileFilter: fileFilter });


router.put('/tmtaddimage/:tmtid',upload.fields([{name: 'sliderImage', maxCount: 1}]),(req,res,next) => {
  console.log(req.files)
  console.log("tmt images")
  let imageData = {}
  if(req.files.sliderImage){
    imageData.slider_image = req.files.sliderImage[0].originalname
  }
  Tshirtmaintype.findOneAndUpdate({_id:req.params.tmtid},imageData)
  .then(result=> {
    //console.log(result)
    res.json({"result":"tshirt maintype image updated","updatedtshirtmaintype":result})
  })
  .catch(err=>{
    console.log(err)
    res.status(404).json(err)
  }
    )
})

router.put('/tmtaddtshirtimages/:tmtid',upload.array('tshirtImages',5),(req,res,next) => {
  console.log(req.files)
  let req_images = req.files
  console.log("tmt images")
  let tshirt_images = req_images.map(img => img.originalname)
  let imageData = {}
  imageData.regular_images = tshirt_images
  //res.json({"multiple":"images"})
  // if(req.files.sliderImage){
  //   imageData.slider_image = req.files.sliderImage[0].originalname
  // }
  Tshirt.findOneAndUpdate({_id:req.params.tmtid},imageData)
  .then(result=> {
    //console.log(result)
    res.json({"result":"tshirt maintype image updated","updatedtshirtmaintype":result})
  })
  .catch(err=>{
    console.log(err)
    res.status(404).json(err)
  }
    )
})

router.put('/ttaddimage/:ttid',upload.fields([{name: 'sliderImage', maxCount: 1}]),(req,res,next) => {
    console.log(req.files)
    console.log("tt images")
    let imageData = {}
    if(req.files.sliderImage){
      imageData.slider_image = req.files.sliderImage[0].originalname
    }
    Tshirttype.findOneAndUpdate({_id:req.params.ttid},imageData)
    .then(result=> {
      //console.log(result)
      res.json({"result":"tshirt type image updated","updatedtshirttype":result})
    })
    .catch(err=>{
      console.log(err)
      res.status(404).json(err)
    }
      )
  })

  router.put('/addimage/:kid',upload.fields([{name: 'hImage', maxCount: 1}, {
    name: 'shadowImage',maxCount: 1},{name: 'overlayImage',maxCount: 1},{name: 'maskImage',maxCount: 1},,{name: 'shadowImage2',maxCount: 1},,{name: 'overlayImage2',maxCount: 1},,{name: 'maskImage2',maxCount: 1}]),(req,res,next) => {
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
    if(req.files.shadowImage2){
      imageData.shadow_image_2 = req.files.shadowImage2[0].originalname
    }
    if(req.files.overlayImage2){
      imageData.overlay_image_2 = req.files.overlayImage2[0].originalname
    }
    if(req.files.maskImage2){
      imageData.mask_image_2 = req.files.maskImage2[0].originalname
    }
    Tshirt.findOneAndUpdate({_id:req.params.kid},imageData)
    .then(result=> {
      //console.log(result)
      res.json({"result":"tshirt image updated","updatedtshirt":result})
    })
    .catch(err=>{
      console.log(err)
      res.status(404).json(err)
    }
      )
  })

  router.post('/addtype', tshirt_controller.add_tshirt_type);

  //router.post('/addsubtype', tshirt_controller.add_tshirt_sub_type);

  router.get('/addsubtypeget', tshirt_controller.add_tshirt_sub_type);

  router.get('/getalltshirttypes', tshirt_controller.get_all_tshirt_types)

  router.get('/getalltshirtsubtypes', tshirt_controller.get_all_tshirt_subtypes)

  router.get('/gettshirttypes', tshirt_controller.get_active_tshirt_types)

router.get('/getttbyidadmin/:ttid', tshirt_controller.get_tt_by_id_admin)

router.get('/gettmtbyidadmin/:tmtid', tshirt_controller.get_tmt_by_id_admin)

router.put('/edittshirttype/:ttid', tshirt_controller.edit_tshirt_type)

router.put('/edittshirtmaintype/:tmtid', tshirt_controller.edit_tshirt_maintype)

router.put('/editttypestatus/:ttid', tshirt_controller.edit_ttype_status)

router.get('/editaddtshirttypename', tshirt_controller.edit_add_tshirt_type_name)


router.get('/getalltshirtmaintypes', tshirt_controller.get_all_tshirt_main_types)

router.get('/gettshirtmaintypesbytypeid/:typeid', tshirt_controller.get_all_tshirt_main_types_by_typeid)

router.get('/gettshirtesbymaintypeid/:mtypeid', tshirt_controller.get_tshirtes_by_main_typeid)

//router.get('/gettshirttypes', tshirt_controller.get_active_tshirt_types)

//router.get('/getttbyidadmin/:ttid', tshirt_controller.get_tt_by_id_admin)

//router.put('/editmaintshirttype/:ttid', tshirt_controller.edit_main_tshirt_type)

router.put('/edittmtypestatus/:tmtid', tshirt_controller.edit_wmaintype_status)


router.get('/tshirts', tshirt_controller.get_active_tshirts)

router.get('/deletetshirtmaintyperan',tshirt_controller.delete_tshirtmaintypes)

router.get('/gettshirtbyidadmin/:mid', tshirt_controller.get_tshirt_by_id_admin)

router.get('/gettshirtbyid/:mid', tshirt_controller.get_tshirt_by_id)

router.get('/gettshirtsbytype/:ttid', tshirt_controller.get_tshirts_by_type)

router.get('/getalltshirts', tshirt_controller.get_all_tshirts)

router.put('/edittshirt/:mid', tshirt_controller.edit_tshirt)

router.put('/editalltshirts', tshirt_controller.edit_all_tshirts)

router.put('/edittshirtstatus/:mid', tshirt_controller.edit_tshirt_status)

router.delete('/deletetshirt', tshirt_controller.delete_tshirts)

router.delete('/deletetshirttypes', tshirt_controller.delete_tshirt_types)

router.post('/addtshirt', tshirt_controller.add_tshirt);




 


module.exports = router