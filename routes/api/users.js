const express = require('express');
const router = express.Router();
const usersController = require('../../controllers/usersController');
const ROLES_LIST = require('../../config/roles_list');
const verifyRoles = require('../../middleware/verifyRoles');

router.route('/')
    .get(verifyRoles(ROLES_LIST.Admin),usersController.getAllUsers)
//     .post(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), employeesController.createNewEmployee)
    

router.route('/:id')
    .get(verifyRoles(ROLES_LIST.Admin),usersController.getUser)
//     .patch(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), employeesController.updateEmployee)
//     .delete(verifyRoles(ROLES_LIST.Admin), employeesController.deleteEmployee);


router.route('/forgotPassword').post(usersController.forgotPassword)
router.route('/resetPassword/:token').patch(usersController.resetPassword )

module.exports = router;