const express = require('express');
const router = express.Router();

//controllers
const dashboardController = require('../controllers/dashboard/dashboard')
const logoutController = require('../controllers/dashboard/logut')
const paymentController = require('../controllers/dashboard/payment')

/* Dashboard */
router.route('/')
.get(dashboardController.getDashboard)

router.route('/logut')
.post(logoutController.postLogout)

router.route('/payment')
.post(paymentController.postPayment)


module.exports = router



