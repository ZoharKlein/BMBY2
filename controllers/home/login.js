const passport = require('passport');
require('../../passports/customerPassport')(passport);
const mongoose = require('../../db/mongoose')


exports.getLogin = (req, res, next) => {
  let emailIn = req.body.companyName
  let passwordIn = req.body.password

  if (req.session.loginCustomer !== undefined) {
    mongoose.Customer.findById(req.session.loginCustomer._id)
    .then(result => {
          req.session.loginCustomer = result
          req.session.save(err => {
            if(err) {
              console.log(err)
            }
            res.redirect('/dashboard') 
          })
    })
    .catch(err => {
      req.session.loginCustomer = undefined

        res.redirect('/') 
         console.log(err)
       })




  }
  else {

    res.render('home/login',{
        title: "Login",
        loginData : {
          email : emailIn,
          password: passwordIn,
        }
      })

  }
}
exports.postLogin = (req, res, next) => {

  if (req.body.loginBtn === "facebook") {
    res.redirect('/auth/facebook')
  }
  else if (req.body.loginBtn === "login") {
    passport.authenticate('local-customer', (err, result, message) =>{

      if (result === false) {
  
        res.render('home/login',{
          title: "Login",
          loginData : {
            email : req.body.email,
            password: req.body.password,
          },
          errMsg : message.message
        })
  
      }
      else {
        req.session.loginCustomer = result
  
        console.log("session", req.session.loginCustomer)
        
        res.redirect('/dashboard')
  
  
      }
    }
    )(req, res, next)

  } 
  


}


// //facebook
// app.get('/customers/auth/facebook', passport.authenticate('facebook') );


// app.get('/auth/facebook/callback',
//   passport.authenticate('facebook', { successRedirect: '/customers',
//                                       failureRedirect: '/customers' }
// ));
