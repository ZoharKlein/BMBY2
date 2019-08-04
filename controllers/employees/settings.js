const mysql = require('../../db/mysql')
const updateUserValid = require('../../validationConfig/joiValidationConfig').updateUserValid
const passwordValid = require('../../validationConfig/joiValidationConfig').passwordValid
const User = require('../../models/User')
const bcryptjs = require('bcryptjs')



exports.getSettings = (req, res, next) => {

    res.render('employees/dashboard',{
        user : global.loginEmployee,
        userMenu: User.selectMenuByRole(global.loginEmployee.role),
        content: "Settings"
      })

}

exports.postSettings = (req, res, next) => {

    const option = req.body.update
    console.log(option)
    console.log(req.body)

    switch (option) {
        case 'img': {
            const imgURL = req.body.imgURL
            if(imgURL===""){
                //return err to user
            }
            else {
                mysql.EnterQuery(mysql.updateProfileImgByID(imgURL,global.loginEmployee.userID))
                .then(result => 

                    setTimeout(() => {
                        res.render('employees/dashboard',{
                            user : global.loginEmployee,
                            userMenu: User.selectMenuByRole(global.loginEmployee.role),
                            content: "Settings"
                          })
                    }, 1500)

                )
                .catch(err => { console.log(err) })
                
            }
            break;
        }
        case 'details': {
  
            
            break;
        }
        case 'password': {
            
            const errMsg = []
            
             if (req.body.password === req.body.passwordVerify) {
                
                // if password are true update
                bcryptjs.compare(req.body.oldPassword,global.loginEmployee.password , (err, isMatch) => {
                    if (err) {

                    } else {
                      if (isMatch) {

                        bcryptjs.compare(req.body.password, global.loginEmployee.password , (err, isMatch) => {
                            if (err) {

                            } else {
                              if (isMatch) {
                                  //error must be a new password
                                  errMsg.push('Must be a new password!')
                                //   console.log('must be a new password')

                              }
                              else {
                                  //enter to db
                                  errMsg.push(passwordValid(req.body.password))
                                //   console.log(errMsg)

                                  if (errMsg.length[0] === undefined) {
                                    
                                      //update password
                                      bcryptjs.hash(req.body.password, global.config.get('Dev.bycriptjs').salt , (hashErr, hash) => {
                                    
                                        if (hashErr) {
                                        console.log(hashErr)
                                        }
                                        else {
                                            mysql.EnterQuery(mysql.updatePasswordByID(hash,global.loginEmployee.userID))
                                            .then(res=> {
                                                errMsg.push('Update new password fine.')
                                            } )
                                            .catch(errsql => { console.log(errsql )})
                                            // console.log('new password in db')

                                        }
                                    
                                        })

                                  }
                              }
                      }})

                      } else {
                        // else output old password incorrect
                        errMsg.push('Old password incorrect!')
                        // console.log('old password incorrect')
                      }
                    }
                
                })


            } else {
                ///output not same new password
                errMsg.push('Not same passwords!')
                console.log('not same password')
            }

            setTimeout(() => {
                console.log(errMsg)
                renderSettings(res,errMsg)
            }, 1000);
            
            break;
        }
        default : {
            res.render('employees/dashboard',{
                user : global.loginEmployee,
                userMenu: User.selectMenuByRole(global.loginEmployee.role),
                content: "Settings"
              })
            break;
        }
    }

}

const renderSettings = (res, errMsg = undefined) => {
    res.render('employees/dashboard',{
        user : global.loginEmployee,
        userMenu: User.selectMenuByRole(global.loginEmployee.role),
        content: "Settings",
        updateErr: errMsg
      })

} 

