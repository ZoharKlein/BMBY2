const express = require('express');
const router = express.Router();

//controllers
const dashboardController = require('../controllers/employees/dashboard')
const usersController = require('../controllers/employees/users')


/* Dashboard */
router.route('/')
.get(dashboardController.getDashboard)


router.route('/users')
.get(usersController.getUsers)

module.exports = router



