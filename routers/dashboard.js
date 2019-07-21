const express = require('express');
const router = express.Router();

//controllers
const dashboardController = require('../controllers/dashboard/dashboard')
const logoutController = require('../controllers/dashboard/logut')

/* Dashboard */
router.route('/')
.get(dashboardController.getDashboard)

router.route('/logut')
.post(logoutController.postLogout)


module.exports = router



