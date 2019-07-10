const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const registrationCheaker = require('./validationConfig/joiValidationConfig')




const login = require('./routers/login')
const logout = require('./routers/logout')
const register = require('./routers/register')



///mysql
///test



// mysqlDB.execute("SELECT * FROM users", function(err, rows, fields) {
//     if (err) {
//         console.log("1)" + err)
//     }
// })



const PORT = process.env.PORT || 3000
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(express.static("public"))

app.set("view engine", "ejs")

///////////////////// Home Page /////////////////////
app.route('/')
    .get((req, res) => {
        res.render('home', { loginOrOut: 'Login / Register', action: 'loginRegister' })

    })

app.route('/loginRegister')
    .post((req, res) => {
        res.render("loginRegister")
    })


///////////////////// Register /////////////////////
/*
app.route('/register')
    .post((req, res) => {
        const date = new Date()

        if (req.body.password === req.body.passwordVerify) {
            registrationCheaker.Joi.validate({

                firstname: req.body.firstname,
                lastname: req.body.lastname,
                email: req.body.email,
                mobile: req.body.mobile,
                city: req.body.city,
                password: req.body.password

            }, registrationCheaker.userSchema, (err, value) => {

                if (err) {
                    console.log("error" + err)
                } else {

                    /// add user to database with status - "wait for admin hack"/ after that render dashboard of the userx


                    const newUser = {
                        firstname: req.body.firstname,
                        lastname: req.body.lastname,
                        email: req.body.email,
                        mobile: req.body.mobile,
                        city: req.body.city,
                        password: req.body.password,
                        status: User.userStats.WAIT_FOR_HACK,
                        regDate: new Date(),
                        birthDay: req.body.birthday
                    }

                    console.log(newUser)
                }

            });
        }
    })
*/

///////////////////// Login /////////////////////

app.use('/', login)
app.use('/', logout)
app.use('/', register)
register

///////////////////// API TO SEND LEAD /////////////////////
app.route('/api/lead/:cid')
    .post((req, res) => {
        console.log(req.params.cid)
        registrationCheaker.Joi.validate({

            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            mobile: req.body.mobile,
            city: req.body.city,
            cid: req.params.cid,
            msg: req.body.msg,
            title: req.body.title

        }, registrationCheaker.leadSchema, (err, value) => {

            if (err) {
                console.log("error" + err)
            } else {

                /// add user to database with status - "wait for admin hack"/ after that render dashboard of the userx
                console.log(value)
            }


        })

    })

app.listen(PORT, () => console.log(PORT + " running"))