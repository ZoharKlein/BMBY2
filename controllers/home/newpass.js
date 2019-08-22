const mongoose = require('../../db/mongoose')
const bycriptjs = require('bcryptjs')

const getNewPassword = require('../../auth/newPassword')
const sendMailWithPassword = require('../../email/email').sendMailWithPassword


exports.getNewpass = (req, res, next) => {

    res.render('home/newpass',{
        title: "Forgot Password",
        msg: ""
    })

}
exports.postNewpass = (req, res, next) => {
    const email = req.body.email

    console.log(email)

    mongoose.Customer.find({email: email})
    .then(result => {
        if (result.length === 0) {

            res.render('home/newpass',{
                title: "Forgot Password",
                msg: "Email Not Found"
            })

        } else {
            const newpass = getNewPassword() 
            console.log(newpass)
            bycriptjs.hash(newpass, global.config.get('Dev.bycriptjs').salt , (err, hash) => {     
                if (err) {
                    console.log(err)
                } else { 
                    mongoose.Customer.update({email: email}, {password:hash})
                    .then(updateResult => { 
                        console.log(updateResult)
                        sendMailWithPassword(email, newpass)
                        res.redirect('/login')
                    })
                    .catch(updateErr => { console.log(updateErr) })
                        
                }
            })

                }
                 
            //send new password
        })

    .catch(err => {console.log(err) })

    }
