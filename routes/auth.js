const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// const usersController = require('../../controllers/usersController');




router.post('/', authController.handleLogin);

router.route('/forgotPassword').post(authController.forgotPassword)
router.route('/resetPassword/:token').patch(authController.resetPassword )





module.exports = router;