const mongooseDB = require('../../db/mongoose')
const customerValid = require('../../validationConfig/joiValidationConfig').customerValid
const Customer = require('../../models/Customer')
const bycriptjs = require('bcryptjs')
const sendWelcomeMail = require('../../email/email').sendWelcomeMail




exports.getSignUp = (req, res, next) => {

    res.render('home/signUp',{
      title: "Sign Up",
      signUpData : {
        comapnyName : "",
        email: "",
      }
    })

  }

exports.postSignUp = (req, res, next) => {
  
  if (req.body.password === req.body.passwordVerify) {

        const errMsg = customerValid(req.body)


        if (errMsg.length > 0) {
            res.render('home/signUp',{
                title: "Sign Up",
                signUpErr: errMsg,
                signUpData : {
                  companyName : req.body.companyName,
                  email: req.body.email
                }
              })
            }
        else {

          bycriptjs.hash(req.body.password, global.config.get('Dev.bycriptjs').salt , (err, hash) => {
                                
            if (err) {
                console.log(err)
            } else { 
             
              const newCutsomer = new Customer({companyName: req.body.companyName, email: req.body.email, password: hash})

              newCutsomer.save()
              .then(result => {
                                if(result === true) {
                                  
                                  //cid neet to send in the mail
                                  sendWelcomeMail(req.body.email,req.body.comapnyName,newCutsomer.customer._id)      
                                  res.render('home/login',{
                                    title: "Login",
                                    loginData : {
                                      email : req.body.email,
                                      password: req.body.password,
                                    }
                                  })
                              } else {

                                res.render('home/signUp',{
                                  title: "Sign Up",
                                  signUpErr: [{key: "Error ", msg: result}],
                                  signUpData : {
                                    companyName : req.body.companyName,
                                    email: req.body.email
                                  }
                                })
                              }

              }).catch(err => {console.log(err)})


             } 
          })

        }

  }
  else {
    res.render('home/signUp',{
      title: "Sign Up",
      signUpErr: [{key: "password", msg: "Not same password!"}],
      signUpData : {
        companyName : req.body.companyName,
        email: req.body.email
      }
    })
  }

}


    

  