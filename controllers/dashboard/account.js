const Payment = require('../../models/Payment')
const mongoose = require('../../db/mongoose')
const Colors = require('../../config/consoleColors').Colors
const bcryptjs = require('bcryptjs')
const passwordValid = require('../../validationConfig/joiValidationConfig').passwordValid
 
exports.getAccount = (req, res, next) => {

  console.log(Colors.FgBlue,'[controllers/dashboard/account.js]', "Get")
  render(req,res,next)
  
}

exports.postAccount = (req,res,next) => {
  console.log(Colors.FgBlue,'[controllers/dashboard/account.js]', "Post")
  changePassword(req,res,next)
  
}

const changePassword = (req,res,next) => {

  const newPassword = req.body.newPassword
  const newPasswordConfirmed = req.body.newPasswordConfirmed
  const oldPassword = req.body.oldPassword

  
  if(newPassword === newPasswordConfirmed) {


    bcryptjs.compare(oldPassword,req.session.loginCustomer.password)
    .then(currectPassword => {
        console.log(currectPassword)
      if (currectPassword) {
        if (oldPassword !== newPassword) {
          let errMsg = []
          errMsg.push(passwordValid(newPassword))
          
          if (errMsg[0] === undefined) {
            addNewPasswordToDB(req,res,next,newPassword)
            
          } else {
            const msg = errMsg[0]
            render(req,res,next,msg)
          }

          console.log(errMsg)
          

          
        } else {
          const msg = "The new password must bee new."
          render(req,res,next,msg)
          
        }
      } else {
          const msg = "The old password are incorrect."
          render(req,res,next,msg)

      }
    })
    .catch(err => {console.log(err) })

    } else {
      const msg = "The new password are not the same at the confirmed input."
      render(req,res,next,msg)

    }
}

const addNewPasswordToDB = (req,res,next,password) => {

  bcryptjs.hash(password, global.config.get('Dev.bycriptjs').salt , (hashErr, hash) => {
                                    
    if (hashErr) {

      console.log(hashErr)
    } else {

      mongoose.Customer.update({_id: mongoose.ObjectId(req.session.loginCustomer._id)}, {password: hash})
      .then(update => {
        console.log(update)
        msg="Password Changaed."
        req.session.loginCustomer.password = hash
        render(req,res,next,msg)
      })

    }
  })

}

const render = (req,res,next,msg = "") => {

  const nowDate = new Date()
  const daysLeft = Math.ceil(Math.abs(nowDate.getTime() - req.session.loginCustomer.expDate.getTime()) / (1000 * 60 * 60 * 24));


  res.render('dashboard/dashboard',{
    title: "BMBY2 Dashboard",
    customer: req.session.loginCustomer,
    laneMenu: Payment.payLaneMenuForCustomer,
    content: 'My Account',
    daysLeft: daysLeft,
    expDate: new Date() > req.session.loginCustomer.expDate ? true : false,
    errMsg : msg

  })

}

