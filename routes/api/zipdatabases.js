const express = require("express")
const router = express.Router()

var zipdatabase_controller = require('../../controllers/zipdatabases');

const checkAuth = require("../../middlewares/checkAuth")

router.get('/zipdatabase', zipdatabase_controller.zip_database_backup);

router.get('/jsonzipdatabase', zipdatabase_controller.json_zip_database_backup);



module.exports = router