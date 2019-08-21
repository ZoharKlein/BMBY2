const mongooseDB = require('../../db/mongoose')
const customerValid = require('../../validationConfig/joiValidationConfig').customerValid
const Customer = require('../../models/Customer')
const bycriptjs = require('bcryptjs')


const nodemiler = require('nodemailer')
const sendgridTransport = require('nodemailer-sendgrid-transport')

const transporter = nodemiler.createTransport(sendgridTransport({
    auth:{
        api_key: global.config.get('Dev.mailConfig').api

    }
}))

//add to places that need that



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

                                  transporter.sendMail({
                                    to: req.body.email,
                                    from: "admin@bmby2.com",
                                    subject: "Thank you for chose bmby2",
                                    html: `<h1>Welcome to bmby2</h1>
                                    <br>
                                    <p>Hello ${req.body.companyName}, We are glad that you start work with our leads manger.</p>`
                                }).catch(err => {console.log(err)})
                                  
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


    

  