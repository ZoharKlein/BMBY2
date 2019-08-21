const mysql = require('../../db/mysql')
const bcryptjs = require('bcryptjs')

exports.getLogin = (req, res, next) => {

  

  if (req.session.loginUser !== undefined) {
    mysql.EnterQuery(mysql.findUserByID(req.session.loginUser.userID))
    .then(result => {
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
              req.session.loginUser = user[0]
              console.log(req.session.loginUser)

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



    
