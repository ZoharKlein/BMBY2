const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const config = require('config');
const passport = require('passport');
global.config = config
// const jwt = require('jsonwebtoken')

//mongo for session
const MongoDBStore = require('connect-mongodb-session')(session)
const store = new MongoDBStore({
    uri: global.config.get('Dev.dbConfig.mongoDB').mongoURL,
    collection: "sessions"
}) 

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
app.use(passport.initialize())
app.use(passport.session());

app.use(express.static("public"))


app.set("view engine", "ejs")


app.use(cookieParser())

app.use(session({
    name: "sid",
    saveUninitialized: false,
    secret: "zohar", 
    store: store,
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



// /**
//  * 
//  * need to do the facebook and goole login on rouutes
//  * need to think what next page will be
//  * 
//  */



// //google
// app.get('/customers/auth/google',
//   passport.authenticate('google', { scope: ['profile'] }));

  
//   app.get('/auth/google/callback', 
//   passport.authenticate('google', { failureRedirect: '/customers' }),
//   function(req, res) {
//     res.redirect('/customers');
//   });








app.listen(PORT, () => console.log(PORT + " running"))

///*facebook
/*
app.get('/customers/auth/facebook', passport.authenticate('facebook') );

app.get('/auth/facebook/callback',
  passport.authenticate('facebook', { successRedirect: '/customers',
                                      failureRedirect: '/login' }));
*/
