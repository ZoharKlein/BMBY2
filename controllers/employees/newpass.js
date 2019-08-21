const mySQL = require('../../db/mysql')
const bycriptjs = require('bcryptjs')

const nodemiler = require('nodemailer')
const sendgridTransport = require('nodemailer-sendgrid-transport')

const transporter = nodemiler.createTransport(sendgridTransport({
    auth:{
        api_key: global.config.get('Dev.mailConfig').api

    }
}))

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


const getNewPassword = () => {
    const str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*'

    let newpass = ""

    for (i = 0 ; i < 10 ; i++ ) {
        newpass += str[Math.floor(Math.random() * str.length)]
    }
    console.log(newpass)
    return newpass

}


const sendMailWithPassword = (email, password) => {

    transporter.sendMail({
        to: email,
        from: "admin@bmby2.com",
        subject: "New password",
        html: `<h1>Your new password</h1>
        <br>
        <p>Hello, Your neew password: <b>${password}</b> <br> we suggest to change it soon as possible.</p>`
    }).catch(err => {console.log(err)})

}