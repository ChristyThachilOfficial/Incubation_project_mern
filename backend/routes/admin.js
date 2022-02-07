const express = require('express')
const router = express.Router()
const adminHelper = require('../controllers/adminController')

router.route('/login').post(adminHelper.adminAuth)
router.route('/').get(adminHelper.getApplications)
router.route('/AcceptApplication/:applicationId').patch(adminHelper.acceptApplications)
router.route('/rejectApplication/:applicationId').patch(adminHelper.rejectApplications)
router.route('/getApplication/:applicationId').get(adminHelper.getSingleApplication)
router.route('/addSlots').post(adminHelper.addSlots)
router.route('/getAllSlots').get(adminHelper.getAllSlots)
router.route('/bookSlot').patch(adminHelper.bookSlots)

module.exports = router