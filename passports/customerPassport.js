const LocalStrategy = require('passport-local').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const FacebookCoustomer = require('../models/FacebookCustomer')
const bcryptjs = require('bcryptjs');
const mongooseDB = require('../db/mongoose')
const FacebookCustomer = require('../models/FacebookCustomer')


//const passport = require('passport')

module.exports = (passport) => {
    console.log('[passports/customerPassport.js]')

    passport.serializeUser(function(user, done){
      done(null, user);
    });
  
    passport.deserializeUser(function(id, done){
      User.findById(id, function(err, user){
        done(err, user);
      });
    });
    
    localCustomerStart(passport)
    //googlestrat(passport)
    facebookstart(passport)
}

const localCustomerStart = (passport) => {
    //login passport

    passport.use('local-customer',
        new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {

          console.log('[passports/customerPassport.js local-customer]')

            // Match user
            mongooseDB.Customer.findOne({
                email: email
              })
              .then(customer => {
                  console.log(customer)
                if (!customer) {
                  return done(null, false, { message: 'That email is not registered' });
                }

        // Match password
        bcryptjs.compare(password, customer.password, (err, isMatch) => {
            console.log(err,isMatch)
            if (err) {
                console.log(err)
            };
            if (isMatch) {
              return done(null, customer);
            } else {
              return done(null, false, { message: 'Password incorrect' });
            }
          });
        });
      })
    );
  
    passport.serializeUser(function(user, done) {

      done(null, user.id);
    });
  
    passport.deserializeUser(function(id, done) {
      User.findById(id, function(err, user) {
        done(err, user);
      });
    });
  };

  const facebookstart = (passport) => {
    //login passport
    passport.use('facebook',
    new FacebookStrategy({
        clientID: '460795267803255',
        clientSecret: '9a4626e822aba65c5242fa5269ae847b',
        callbackURL: "http://localhost:3000/auth/facebook/callback",
        profileFields   : ['id', 'email', 'gender', 'link', 'locale', 'name', 'timezone', 'updated_time', 'verified'],

      },
      (accessToken, refreshToken, profile, done) => { 
        console.log('[passports/customerPassport.js facebook]')
          //process.nextTick(

          mongooseDB.FacebookCoustomer.findOne({facebookID:profile.id})
          .then(user => {

            console.log("user" , user)
            if (user === null) {
              newUser = {
                companyName:profile.name.givenName + " " + profile.name.familyName,
                email: profile.emails[0].value,
                facebookID: profile.id
              }
              console.log(typeof profile.id)
              facebookCustomer = new FacebookCustomer(newUser)

              console.log(facebookCustomer)
              facebookCustomer.save()
              .then(res => {
                console.log('Add Facebook User',res)
                return done(null, facebookCustomer); 
              })
              .catch(err => console.log(err))

            } else {

              console.log('Facebook User In the DB Allready')
              return done(null, user);


            }

          })
          .catch(err => {console.log(err)})
        
        //  )
        }))
        }
