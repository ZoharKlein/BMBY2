const express = require('express');
const router = express.Router();
const passport = require('passport')


require('../../passports/passport')(passport);



router.use(passport.initialize())
router.use(passport.session())




router.get('/customers/auth/facebook', (req, res, next) => {


    passport.authenticate('facebook-login', (err, result, message) => {

        if (err) {
            console.log(err)
        } else {
            if (!result) {
                res.render("/customers", { error: message.message })
            } else {
                res.render('/customers', { ok:"ok" })
            }
        }

        console.log(err, result)
    })(req, res, next);

})





//router.post('/customers/auth/facebook', passport.authenticate('facebook-login') );

router.get('/auth/facebook/callback',
  passport.authenticate('facebook-login', {
       successRedirect: '/customers',
       failureRedirect: '/login' 
    }));


                                      

/*
router.get('/customers/auth/facebook', (req, res, next) => {


    passport.authenticate('facebook', (err, result, message) => {
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

//router.post('/customers/auth/facebook', passport.authenticate('facebook') );

router.get('/auth/facebook/callback',
  passport.authenticate('facebook', { successRedirect: '/customers',
                                      failureRedirect: '/login' }
));


*/
module.exports = router;
