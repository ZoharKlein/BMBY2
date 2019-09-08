const nodemiler = require('nodemailer')
const sendgridTransport = require('nodemailer-sendgrid-transport')

const transporter = nodemiler.createTransport(sendgridTransport({
    auth:{
        api_key: global.config.get('Dev.mailConfig').api

    }
}))


module.exports.sendMailWithPassword = (email, password) => {
    console.log("[email/email.js]")
    console.log(`email sent to ${email} with the password ${password}`)

    transporter.sendMail({
        to: email,
        from: "admin@bmby2.com",
        subject: "New password",
        html: `<h1>Your new password</h1>
        <br>
        <p>Hello, Your neew password: <b>${password}</b> <br> we suggest to change it soon as possible.</p>`
    }).catch(err => {console.log(err)})

}

module.exports.sendWelcomeMail = (email,companyNamem,cid) => {
    transporter.sendMail({
        to: email,
        from: "admin@bmby2.com",
        subject: "Thank you for chose bmby2",
        html: `<h1>Welcome to bmby2</h1>
        <br>
        <p>Hello ${companyName}, We are glad that you start work with our leads manger.
        <br>
        here are your form to use your website 

        <form action="http://localhost:3000/api/lead" method="POST">

        <input type="hidden" name="cid" value="${cid}" placeholder="First Name">

        <input type="text" name="firstname" placeholder="First Name">
        <br>
        <input type="text" name="lastname" placeholder="Last Name">
        <br>
        <input type="email" name="email" placeholder="Email ">
        <br>
        <input type="text" name="mobile" placeholder="Phone">
        <br>
        <input type="text" name="city" placeholder="City">
        <br>
        <input type="text" name="title" placeholder="Subject">
        <br>
        <textarea type="text" name="msg" placeholder="Write To us" rows="10" cols="40"></textarea>
        <br>
        <button type="submit">Send</button>
    </form>
        </p>`
    }).catch(err => {console.log(err)})
}


