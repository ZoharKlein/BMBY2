const express = require('express');
const router = express.Router();

//controllers
const dashboardController = require('../controllers/employees/dashboard')
const usersController = require('../controllers/employees/users')
const settingsController = require('../controllers/employees/settings')


/* Dashboard */
router.route('/')
.get(dashboardController.getDashboard)


router.route('/users')
.get(usersController.getUsers)
.post(usersController.postUsers)

router.route('/settings')
.get(settingsController.getSettings)
.post(settingsController.postSettings)




module.exports = router



