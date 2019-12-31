const express = require("express")
const router = express.Router()
const multer = require("multer")

var user_controller = require('../../controllers/users');
var offer_controller = require('../../controllers/offers');

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

router.put('/addimage/:pid',upload.single('offer_image'),(req,res,next) => {
  console.log("below file")
  console.log(req.file)
  console.log(req.params.pid)
  let imageData = {}
  if(req.file){
    imageData.h_image = req.file.originalname
  }
  Offer.findOneAndUpdate({_id:req.params.pid},imageData)
  .then(result=> res.json({"result":"offer image updated","updatedoffer":result}))
  .catch(err=>res.status(404).json(err))
})



// GET request to get specific user. 
// router.get('/getoffer/:offerid', offer_controller.get_offer);

// GET request to get specific user. 
router.get('/getoffers', offer_controller.get_offers);  

router.get('/getalloffers', offer_controller.get_all_offers)

 // GET request to get all users. 
 router.post('/addoffer', offer_controller.add_offer);

 router.put('/editoffer/:oid', offer_controller.edit_offer);

 router.put('/editalloffers', offer_controller.edit_all_offers);

 router.put('/editofferstatus/:oid', offer_controller.edit_offer_status);

 router.delete('/deleteoffer', offer_controller.delete_offers)

// GET request for count of friends of a specific user. 
//  router.get('/countusers', user_controller.count_users);

 // GET request for count of friends of a specific user. 
//  router.delete('/deleteuser/:did', user_controller.delete_user);

// GET request for count of friends requests of a specific user. 
//  router.put('/edituser/:eid', user_controller.edit_user);

module.exports = router