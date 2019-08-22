const mySQL = require('../../db/mysql')
const bycriptjs = require('bcryptjs')
const getNewPassword = require('../../auth/newPassword')
const sendMailWithPassword = require('../../email/email').sendMailWithPassword


exports.getNewpass = (req, res, next) => {

    res.render('employees/newpass',{
        title: "Forgot Password",
        msg: ""
    })

}
exports.postNewpass = (req, res, next) => {
    const email = req.body.email

    console.log(email)

    mySQL.EnterQuery(mySQL.findUserByMail(email))
    .then(user => {
        console.log(user[0].userID)
        if (user.length === 0) {

            res.render('employees/newpass',{
                title: "Forgot Password",
                msg: "Email Not Found"
            })

        } else {
            const newpass = getNewPassword()
            bycriptjs.hash(newpass, global.config.get('Dev.bycriptjs').salt , (err, hash) => {     
                if (err) {
                    console.log(err)
                } else { 
                    mySQL.EnterQuery(mySQL.updatePasswordByID(hash,user[0].userID))
                    .then(updateResult => { 
                        console.log(updateResult)
                        sendMailWithPassword(email, newpass)
                        res.redirect('/employees/login')
                    })
                    .catch(updateErr => { console.log(updateErr) })
                        
                }
            })

                }
                 
        })

    .catch(err => {console.log(err) })

    }

