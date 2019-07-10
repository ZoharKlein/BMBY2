const express = require('express');
const router = express.Router();
const passport = require('passport')
const menu = require('../model/menuItems')

require('../passports/passport')(passport);

//app.use(router)
router.use(passport.initialize())
router.use(passport.session())


router.post('/login', (req, res, next) => {


    passport.authenticate('local-login', (err, result, message) => {
        console.log(err, result, message, req.body.message)
        if (err) {
            console.log(err)
        } else {
            if (!result) {
                res.render("loginRegister", { error: message.message })
            } else {
                res.render('home', { loginOrOut: 'Logout', action: 'logout', menuBar: menu.superAdmin })
            }
        }

        console.log(err, result)
    })(req, res, next);

})

router.post('/logout', (req, res) => {
    req.logout();
    res.redirect('/')
})



module.exports = router;