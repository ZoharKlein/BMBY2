const passport = require('passport');
require('../../passports/customerPassport')(passport);

exports.getLogin = (req, res, next) => {
  let emailIn = req.body.companyName
  let passwordIn = req.body.password

  if (req.session.loginData !== undefined) {
    emailIn = req.session.loginData.email
    passwordIn = req.session.loginData.password
  }


    res.render('home/login',{
        title: "Login",
        loginData : {
          email : emailIn,
          password: passwordIn,
        }
      })

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
      global.loginCustomer = result
      req.session.loginData = {email: req.body.email, password: req.body.password}
      
      res.redirect('/dashboard')


    }
    


  }
  )(req, res, next)

}



