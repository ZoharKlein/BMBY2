const mysql = require('../../db/mysql')
const bcryptjs = require('bcryptjs')

exports.getLogin = (req, res, next) => {

    res.render('employees/login',{
      title: "Login",
      loginData : {
        email : "",
        password: "",
      }
    })

  }

  exports.postLogin = (req, res, next) => {

    //change to passport after i finsh

    mysql.EnterQuery(mysql.findUserByMail(req.body.email))
    .then(user => { 
      console.log(user)
      if (user.length > 0 ) {
        
        bcryptjs.compare(req.body.password, user[0].password, (err, isMatch) => {
          if (err) {

          } else {
            if (isMatch) {
              console.log('ok')
              global.loginEmployee = user[0]
              console.log(global.loginEmployee)

              res.redirect('/employees/dashboard')
            }
            
            else {
              res.render('employees/login',{
                title: "Login",
                errMsg: "Wrong Password!",
                loginData : {
                  email : req.body.email,
                  password: "",
                }
              })
            }
          }
      }) 

      }
      
      else {
        res.render('employees/login',{
          title: "Login",
          errMsg: "Wrong Email!",
          loginData : {
            email : "",
            password: "",
          }
        })
      }
      
    })
    .catch(mysqlErr => {console.log(mysqlErr) })



  }



    

