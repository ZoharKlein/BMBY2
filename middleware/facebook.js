const passport = require('passport');
require('../passports/customerPassport')(passport);

module.exports = (req,res,next) => {
    console.log('midd faceob')
    console.log(passport)

    passport.authenticate('facebook', (err, user) => {
        console.log(err,user)
        if (user) {
            console.log('ok',user)
    
        }})

        next();
    
}