const passport = require('passport');
require('../../passports/customerPassport')(passport);
const mongoose = require('../../db/mongoose')


exports.getLogin = (req, res, next) => {
  let emailIn = req.body.companyName
  let passwordIn = req.body.password

  
  // if (req.session.loginData !== undefined) {
    // emailIn = req.session.loginData.email
    // passwordIn = req.session.loginData.password
  // }

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



