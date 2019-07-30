const express = require('express');
const router = express.Router();

//controllers
const loginController = require('../controllers/employees/login')
const signupController = require('../controllers/employees/signup')

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


router.use('/dashboard', dashboardEmployeesRouter)
module.exports = router



