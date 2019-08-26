const express = require('express');
const router = express.Router();

//controllers
const dashboardController = require('../controllers/employees/dashboard')
const usersController = require('../controllers/employees/users')
const settingsController = require('../controllers/employees/settings')
const leadsController = require('../controllers/employees/leads')
const customersController = require('../controllers/employees/customers')
const reportsController = require('../controllers/employees/reports')

const isPasswordExpiredMiddleware = require('../middleware/isPasswordExpired')


/* Dashboard */
router.route('/')
.get(isPasswordExpiredMiddleware, dashboardController.getDashboard)

router.route('/home')
.get(isPasswordExpiredMiddleware, dashboardController.getDashboardHome)


router.route('/users')
.get(isPasswordExpiredMiddleware, isPasswordExpiredMiddleware,usersController.getUsers)
.post(usersController.postUsers)

router.route('/leads')
.get(isPasswordExpiredMiddleware , leadsController.getLeads)
.post(leadsController.postLeads)

router.route('/customers')
.get(isPasswordExpiredMiddleware, customersController.getCustomers)

router.route('/reports')
.get(isPasswordExpiredMiddleware, reportsController.getReports)

router.route('/settings')
.get(settingsController.getSettings)
.post(settingsController.postSettings)





module.exports = router



