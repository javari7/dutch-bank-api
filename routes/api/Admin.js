const express = require('express');
const router = express.Router();
const ROLES_LIST = require('../../config/roles_list');
const verifyRoles = require('../../middleware/verifyRoles');
const userDataController = require('../../controllers/userDataController');
const AdminController = require('../../controllers/AdminController');




 router.route('/users').get(verifyRoles(ROLES_LIST.Admin),AdminController.getUsers )


router.route('/:id')
    .get(verifyRoles(ROLES_LIST.Admin,ROLES_LIST.Editor),AdminController.getUser)


     router.route('/updateUser/:id')
    .post(verifyRoles(ROLES_LIST.Admin,ROLES_LIST.Editor),AdminController.upDateUser)

    router.route('/updateUsers')
    .put(verifyRoles(ROLES_LIST.Admin,ROLES_LIST.Editor),AdminController.upDateUsers)



    module.exports = router;