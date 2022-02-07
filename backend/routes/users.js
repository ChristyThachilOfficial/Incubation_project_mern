const express = require('express');
const router = express.Router();
const {registerUser, authUser ,incubationRegister,applicationList ,deleteApplication} = require('../controllers/userController')

router.route('/signup').post(registerUser)
router.route('/login').post(authUser)
router.route('/register').post(incubationRegister)
router.route('/:userId').get(applicationList)
router.route('/:applicationId').delete(deleteApplication)


module.exports = router;