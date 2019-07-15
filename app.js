const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const registrationCheaker = require('./validationConfig/joiValidationConfig')




const login = require('./routers/login')
const logout = require('./routers/logout')
const register = require('./routers/register')

const customersLogin = require('./routers/coustomers/login')
const leadAPI = require('./routers/LeadApi/leadAPI')



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





///////////////////// new Home Page /////////////////////

app.route('/')
    .get((req, res) => {
        res.render('index', { loginOrOut: 'Login / Register', action: 'loginRegister' })

    })

app.route('/register')
    .get((req, res) => {
        res.render("register")
    })

///////////////////// Home Page /////////////////////
app.route('/')
    .get((req, res) => {
        res.render('home', { loginOrOut: 'Login / Register', action: 'loginRegister' })

    })

app.route('/loginRegister')
    .post((req, res) => {
        res.render("loginRegister")
    })


///////////////////// Login /////////////////////

app.use('/', login)
app.use('/', logout)
app.use('/', register)

///////////////////// Customers /////////////////////
app.use('/customers/', customersLogin)

app.get("/customers", (req, res) => {
    res.render('customers')
})
const passport = require('passport')
require('./passports/passport')(passport);






/**
 * 
 * need to do the facebook and goole login on rouutes
 * need to think what next page will be
 * 
 */
//facebook
app.get('/customers/auth/facebook', passport.authenticate('facebook') );


app.get('/auth/facebook/callback',
  passport.authenticate('facebook', { successRedirect: '/customers',
                                      failureRedirect: '/customers' }
));


//google
app.get('/customers/auth/google',
  passport.authenticate('google', { scope: ['profile'] }));

  
  app.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/customers' }),
  function(req, res) {
    res.redirect('/customers');
  });










///////////////////// API TO SEND LEAD /////////////////////

app.use('/',leadAPI)
/*
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

               
                console.log(value)
            }


        })

    })
*/

    


app.listen(PORT, () => console.log(PORT + " running"))

///*facebook
/*
app.get('/customers/auth/facebook', passport.authenticate('facebook') );

app.get('/auth/facebook/callback',
  passport.authenticate('facebook', { successRedirect: '/customers',
                                      failureRedirect: '/login' }));
*/