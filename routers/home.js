const passport = require('passport');
require('../passports/customerPassport')(passport);


const mid = require('../middleware/facebook')
/**
 * about
 * our crm
 * contact us
 * login
 * sign up
 * learn more
 * employee login
 * employee sgin up
 */

const express = require('express');
const router = express.Router();

//controllers
const homeController = require('../controllers/home/home')
const aboutController = require('../controllers/home/about')
const ourCrmController = require('../controllers/home/ourCRM')
const contactUsController = require('../controllers/home/contactUs')
const signUpController = require('../controllers/home/signUp')
const loginController = require('../controllers/home/login')
const newpassController = require('../controllers/home/newpass')

/* Home */
router.route('/')
.get(homeController.getHome)

/* About */
router.route('/about')
.get(aboutController.getAbout)

/* Our CRM */
router.route('/ourcrm')
.get(ourCrmController.getOurCRM)

/* Contact Us */
router.route('/contact')
.get(contactUsController.getContactUs)
.post(contactUsController.postContactUs)

/* Login */
router.route('/login')
.get(loginController.getLogin)
.post(loginController.postLogin)

// /* Facebook Login */
// router.route('/auth/facebook')
// .post(facebookLoginController.postFacebookLogin)

router.route('/auth/facebook')
.get(passport.authenticate('facebook',
{ scope : ['email']} ) )

router.route('/auth/facebook/callback')
.get(passport.authenticate('facebook', { successRedirect: '/dashboard', failureRedirect: '/login' }))


/* Forgot Password */
router.route('/newpass')
.get(newpassController.getNewpass)
.post(newpassController.postNewpass)

/* Sign Up */
router.route('/signup')
.get(signUpController.getSignUp)
.post(signUpController.postSignUp)


module.exports = router;