const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const config = require('config');

const jwt = require('jsonwebtoken')

global.config = config

///Routers
const leadAPI = require('./routers/LeadApi/leadAPI')


//new project
const homeRouter = require('./routers/home')
const dashboardRouter = require('./routers/dashboard')
const employeesRouter = require('./routers/employees')


//controllers
const errorController = require('./controllers/errorController')


const PORT = process.env.PORT || 3000


app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(express.static("public"))


app.set("view engine", "ejs")


app.use(cookieParser())

app.use(session({
    name: "sid",
    saveUninitialized: false,
    secret: "zohar", 
    cookie: { 
        maxAge: 1000 * 60 * 60 * 24 * 7,//week
        sameSite: true,
        saveUninitialized: false,
        resave: false

    }}))

///////////////////// Home Page /////////////////////
/**
 * about 
 * our crm
 * contact us
 * login
 * sign up
 * learn more
 * employee login
 * employee sgin up
 */
app.use('/',homeRouter)



///////////////////// Dashboard For Customers /////////////////////
/**
 * 
 */
app.use('/dashboard/',dashboardRouter)


///////////////////// Employee /////////////////////
/**
 * login
 * sign up
 */
app.use('/employees/',employeesRouter)

///////////////////// API TO SEND LEAD /////////////////////
app.use('/api',leadAPI)



///////////////////// 404 Page /////////////////////
app.use(errorController.get404);



// ///////////////////// new Home Page /////////////////////

// app.route('/')
//     .get((req, res) => {
//         res.render('index', { loginOrOut: 'Login / Register', action: 'loginRegister' })

//     })

// app.route('/register')
//     .get((req, res) => {
//         res.render("register")
//     })

// ///////////////////// Home Page /////////////////////
// app.route('/')
//     .get((req, res) => {
//         res.render('home', { loginOrOut: 'Login / Register', action: 'loginRegister' })

//     })

// app.route('/loginRegister')
//     .post((req, res) => {
//         res.render("loginRegister")
//     })


// ///////////////////// Login /////////////////////

// app.use('/', login)
// app.use('/', logout)
// app.use('/', register)

// ///////////////////// Customers /////////////////////
// app.use('/customers/', customersLogin)

// app.get("/customers", (req, res) => {
//     res.render('customers')
// })
// const passport = require('passport')
// require('./passports/passport')(passport);




// /////temp for customer
// app.get('/costumerReg', (req,res) => {
//     res.render('costumer-reg')
// })







// /**
//  * 
//  * need to do the facebook and goole login on rouutes
//  * need to think what next page will be
//  * 
//  */
// //facebook
// app.get('/customers/auth/facebook', passport.authenticate('facebook') );


// app.get('/auth/facebook/callback',
//   passport.authenticate('facebook', { successRedirect: '/customers',
//                                       failureRedirect: '/customers' }
// ));


// //google
// app.get('/customers/auth/google',
//   passport.authenticate('google', { scope: ['profile'] }));

  
//   app.get('/auth/google/callback', 
//   passport.authenticate('google', { failureRedirect: '/customers' }),
//   function(req, res) {
//     res.redirect('/customers');
//   });







    
///////////////////// dashboard /////////////////////


//app.use('/dashboard',dashboardNav)
/*
app.post('/dashboard/Leads', (req,res)=>{
    console.log('OK')
    res.send('OK')
})*/






app.listen(PORT, () => console.log(PORT + " running"))

///*facebook
/*
app.get('/customers/auth/facebook', passport.authenticate('facebook') );

app.get('/auth/facebook/callback',
  passport.authenticate('facebook', { successRedirect: '/customers',
                                      failureRedirect: '/login' }));
*/