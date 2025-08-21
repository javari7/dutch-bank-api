const express = require('express');
const router = express.Router();
const employeesController = require('../../controllers/usersController');
const ROLES_LIST = require('../../config/roles_list');
const verifyRoles = require('../../middleware/verifyRoles');

router.route('/')
    .get(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor),employeesController.getAllUsers)
//     .post(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), employeesController.createNewEmployee)
    

// router.route('/:id')
//     .get(employeesController.getEmployee)
//     .patch(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), employeesController.updateEmployee)
//     .delete(verifyRoles(ROLES_LIST.Admin), employeesController.deleteEmployee);

module.exports = router;