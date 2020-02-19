const express = require("express")
const router = express.Router()

var zipdatabase_controller = require('../../controllers/zipdatabases');

const checkAuth = require("../../middlewares/checkAuth")

router.get('/zipdatabase',checkAuth, zipdatabase_controller.zip_database_backup);



module.exports = router