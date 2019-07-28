const express = require('express');
const router = express.Router();

//controllers
const loginController = require('../controllers/employees/login')
const signupController = require('../controllers/employees/signup')

/* Sign Up */
router.route('/signup')
.get(signupController.getSignUp)
.post(signupController.postSignUp)


router.route('/login')
.get(loginController.getLogin)
module.exports = router



