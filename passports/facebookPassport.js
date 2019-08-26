const LocalStrategy = require('passport-local').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy

const bcryptjs = require('bcryptjs');
const mongooseDB = require('../db/mongoose')


//const passport = require('passport')

module.exports = (passport) => {
    //googlestrat(passport)
    console.log('s')
    facebookstart(passport)
}

const facebookstart = (passport) => {
  //login passport
  console.log('ok')
  passport.use('facebook',
  new FacebookStrategy({
      clientID: '460795267803255',
      clientSecret: '9a4626e822aba65c5242fa5269ae847b',
      callbackURL: "http://localhost:3000/auth/facebook/callback",
    },
    (accessToken, refreshToken, profile, done) => {  
      console.log('ok')
      mongooseDB.Customer.find({facebookID:profile.id},(err,result)=> {
          if(err) {
              console.log('errror' + err)
              return done(null, false, {message: "can't connect with facebook!"});
          }else {
              console.log(profile)
  
              if (result.length === 0)
              {
              newCustomer = mongooseDB.Customer({
                  username: profile.displayName,
                  password: accessToken,
                  facebookID: profile.id,
              })
              
              newCustomer.save()
              return done(null, newCustomer);
  
              }
              else {
                  console.log('in the system')
                  return done(null,false ,{message: "register"});
              }
          
              console.log(result)
          }
      })
      
    }
  ));
  
}