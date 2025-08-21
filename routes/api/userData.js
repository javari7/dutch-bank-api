const express = require('express');
const router = express.Router();
const userDataController = require('../../controllers/userDataController');




router.route('/add').post(userDataController.add);
router.route('/subtract').post(userDataController.subtract);

router.route('/')
.get(userDataController.getUser )


module.exports = router;