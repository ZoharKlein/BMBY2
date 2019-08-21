const express = require('express');
const router = express.Router();

//controllers
const loginController = require('../controllers/employees/login')
const signupController = require('../controllers/employees/signup')
const newpassController = require('../controllers/employees/newpass')

//routers
const dashboardEmployeesRouter = require('./dashboardEmployee')

/* Sign Up */
router.route('/signup')
.get(signupController.getSignUp)
.post(signupController.postSignUp)

/* Login */
router.route('/login')
.get(loginController.getLogin)
.post(loginController.postLogin)

/* Forogot Password */
router.route('/newpass')
.get(newpassController.getNewpass)
.post(newpassController.postNewpass)

router.use('/dashboard', dashboardEmployeesRouter)
module.exports = router



