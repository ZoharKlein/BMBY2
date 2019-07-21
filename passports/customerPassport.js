const LocalStrategy = require('passport-local').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const bcryptjs = require('bcryptjs');
const mongooseDB = require('../db/mongoose')


//const passport = require('passport')

module.exports = (passport) => {
    localCustomerStart(passport)
    //googlestrat(passport)
    //facebookstart(passport)
}

const localCustomerStart = (passport) => {
    //login passport
    passport.use('local-customer',
        new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {

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