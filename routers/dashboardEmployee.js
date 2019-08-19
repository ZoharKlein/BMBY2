const express = require('express');
const router = express.Router();

//controllers
const dashboardController = require('../controllers/employees/dashboard')
const usersController = require('../controllers/employees/users')
const settingsController = require('../controllers/employees/settings')
const leadsController = require('../controllers/employees/leads')
const customersController = require('../controllers/employees/customers')
const reportsController = require('../controllers/employees/reports')


/* Dashboard */
router.route('/')
.get(dashboardController.getDashboard)

router.route('/home')
.get(dashboardController.getDashboardHome)

router.route('/users')
.get(usersController.getUsers)
.post(usersController.postUsers)

router.route('/leads')
.get(leadsController.getLeads)
.post(leadsController.postLeads)

router.route('/customers')
.get(customersController.getCustomers)

router.route('/reports')
.get(reportsController.getReports)

router.route('/settings')
.get(settingsController.getSettings)
.post(settingsController.postSettings)





module.exports = router



