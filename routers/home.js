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


module.exports = router;