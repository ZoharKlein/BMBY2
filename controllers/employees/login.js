const mysql = require('../../db/mysql')
const bcryptjs = require('bcryptjs')
const passport = require('passport');
require('../../passports/employeePassport')(passport);

exports.getLogin = (req, res, next) => {

  if (req.session.loginUser !== undefined && req.session.loginUser !== null) {
    mysql.EnterQuery(mysql.findUserByID(req.session.loginUser.userID))
    .then(result => {

          //destory cookice and create a new one ******
          console.log(1, req.session.loginUser)
          req.session.loginUser = result[0]
          console.log("result",result)
          console.log(2, req.session.loginUser)
          req.session.save(err => {
            if(err) {
              console.log(err)
            }
            res.redirect('/employees/dashboard')
          })
    })
    .catch(err => {
      req.session.loginUser = undefined
      console.log(err)})
    
    } else {

    res.render('employees/login',{
      title: "Login",
      loginData : {
        email : "",
        password: "",
      }
    })
  }
}
  exports.postLogin = (req, res, next) => {

    //passpost

    passport.authenticate('local-employee', (err, result, message) =>{

      if (result === false) {
  
        res.render('employees/login',{
          title: "Login",
          loginData : {
            email : req.body.email,
            password: req.body.password,
          },
          errMsg : message.message
        })
  
      }
      else {
        req.session.loginUser = result
  
        console.log("session", req.session.loginUser)
        
        res.redirect('/employees/dashboard')
  
  
      }
    }
    )(req, res, next)

  }



    
