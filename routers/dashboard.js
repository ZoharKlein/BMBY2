const express = require('express');
const router = express.Router();

//controllers
const dashboardController = require('../controllers/dashboard/dashboard')
const logoutController = require('../controllers/dashboard/logut')
const paymentController = require('../controllers/dashboard/payment')
const accountController = require('../controllers/dashboard/account')
const leadsController = require('../controllers/dashboard/leads')

/* Dashboard */
router.route('/')
.get(dashboardController.getDashboard)

router.route('/logut')
.post(logoutController.postLogout)

router.route('/payment')
.post(paymentController.postPayment)

router.route('/account')
.get(accountController.getAccount)
.post(accountController.postAccount)

router.route('/leads')
.get(leadsController.getLeads)
.post(leadsController.postLeads)


module.exports = router



