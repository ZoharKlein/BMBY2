const mysql = require('../../db/mysql')
const updateUserValid = require('../../validationConfig/joiValidationConfig').updateUserValid
const passwordValid = require('../../validationConfig/joiValidationConfig').passwordValid
const User = require('../../models/User')
const bcryptjs = require('bcryptjs')



exports.getSettings = (req, res, next) => {
    let errMsg = ['']

    if (req.session.loginUser.lastPasswordUpdate >= new Date() ) {
        errMsg = ['your password are expired. please renew it.']
    }

    res.render('employees/dashboard',{
        user : req.session.loginUser,
        userMenu: User.selectMenuByRole(req.session.loginUser.role),
        content: "Settings",
        updateErr: errMsg
      })

}

exports.postSettings = (req, res, next) => {

    const option = req.body.update
    console.log(option)
    console.log(req.body)
    const errMsg = []

    switch (option) {
        case 'img': {
            const imgURL = req.body.imgURL
            if(imgURL===""){
                //return err to user
            }
            else {
                mysql.EnterQuery(mysql.updateProfileImgByID(imgURL,req.session.loginUser.userID))
                .then(result => 
                    req.session.loginUser.profileImg = imgURL
                )
                .catch(err => { console.log(err) })
                
            }
            break;
        }
        case 'details': {
            errMsg.push(updateUserValid(req.body))
            console.log(errMsg)
            if (errMsg[0] === undefined) {
                //update sql
                mysql.EnterQuery(mysql.updateDetailes(req.body.firstName,req.body.lastName,
                    req.body.city,req.body.email,req.body.mobile,req.session.loginUser.userID))
                    .then(result => {
                        req.session.loginUser.firstName = req.body.firstName
                        req.session.loginUser.lastName = req.body.lastName
                        req.session.loginUser.email = req.body.email
                        req.session.loginUser.mobile = req.body.mobile
                        req.session.loginUser.city = req.body.city
                         errMsg.push('Details Updated.')})
                    .catch(err => { console.log(err)})
            }
  
            
            break;
        }
        case 'password': {
            
            
             if (req.body.password === req.body.passwordVerify) {
                
                // if password are true update
                bcryptjs.compare(req.body.oldPassword,req.session.loginUser.password , (err, isMatch) => {
                    if (err) {

                    } else {
                      if (isMatch) {

                        bcryptjs.compare(req.body.password, req.session.loginUser.password , (err, isMatch) => {
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
                                  console.log(errMsg)

                                  if (errMsg[0] === undefined) {
                                    
                                      //update password
                                      bcryptjs.hash(req.body.password, global.config.get('Dev.bycriptjs').salt , (hashErr, hash) => {
                                    
                                        if (hashErr) {
                                        console.log(hashErr)
                                        }
                                        else {
                                            mysql.EnterQuery(mysql.updatePasswordByID(hash,req.session.loginUser.userID))
                                            .then(res=> {
                                                req.session.loginUser.password = hash
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


            
            break;
        }
        default : {
            res.render('employees/dashboard',{
                user : req.session.loginUser,
                userMenu: User.selectMenuByRole(req.session.loginUser.role),
                content: "Settings"
              })
            break;
        }

    }
    setTimeout(() => {
        console.log(errMsg)
        renderSettings(req,res,errMsg)
    }, 1000);

}

const renderSettings = (req,res, errMsg = undefined) => {
    res.render('employees/dashboard',{
        user : req.session.loginUser,
        userMenu: User.selectMenuByRole(req.session.loginUser.role),
        content: "Settings",
        updateErr: errMsg
      })

} 

