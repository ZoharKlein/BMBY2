const mysql = require('../../db/mysql')
const userValid = require('../../validationConfig/joiValidationConfig').userValid
const User = require('../../models/User')
const bycriptjs = require('bcryptjs')



exports.getSignUp = (req, res, next) => {

    res.render('employees/signup',{
      title: "Sign Up",
      signUpData : {
        firstname : "",
        lastname: "",
        email: "",
        city: "",
        mobile: "",
        birthday: ""        
      }
    })

  }


exports.postSignUp = (req, res, next) => {

  if (req.body.password === req.body.passwordVerify) {

    const errMsg = userValid(req.body)

    if (errMsg.length > 0) {
      res.render('employees/signup',{
        title: "Sign Up",
        signUpErr: errMsg,
        signUpData : {
          firstname : req.body.firstname,
          lastname: req.body.lastname,
          email: req.body.email,
          city: req.body.city,
          mobile: req.body.mobile,
          birthday: req.body.birthday  
      }

      })
    }
    else {
      mysql.EnterQuery(mysql.findUserByMail(req.body.email))
      .then(result => {
        if (result.length > 0 )
        res.render('employees/signup',{
          title: "Sign Up",
          signUpErr: [{key: "Email", msg: "Email allready sign!"}],
          signUpData : {
              firstname : req.body.firstname,
              lastname: req.body.lastname,
              email: req.body.email,
              city: req.body.city,
              mobile: req.body.mobile,
              birthday: req.body.birthday  
          }
        })
        else {
          bycriptjs.hash(req.body.password, global.config.get('Dev.bycriptjs').salt , (hashErr, hash) => {
                                    
            if (hashErr) {
            console.log(hashErr)
            }
            else {
              let user = req.body
              user.hash = hash

              const newUser = new User(user)
              newUser.insertNewUser()
              
              setTimeout(() => {
                res.render('employees/login',{
                  title: "Login",
                  signUpErr: errMsg,
                  loginData : {
                    email: req.body.email,
                    password: req.body.password, 
                }
          
                })
  
              }, 1000);

      



            }

      })
    }


    })
      .catch(error => {console.log(error) })
    }



  }


  else {

    res.render('employees/signup',{
      title: "Sign Up",
      signUpErr: [{key: "password", msg: "Not same password!"}],
      signUpData : {
          firstname : req.body.firstname,
          lastname: req.body.lastname,
          email: req.body.email,
          city: req.body.city,
          mobile: req.body.mobile,
          birthday: req.body.birthday  
      }
  
    })
  }
}
