const express = require('express');
const router = express.Router();

//controllers
const dashboardController = require('../controllers/employees/dashboard')


/* Dashboard */
router.route('/')
.get(dashboardController.getDashboard)


module.exports = router



