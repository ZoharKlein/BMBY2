const LocalStrategy = require('passport-local').Strategy;
const bcryptjs = require('bcryptjs');
const mysql = require('../db/mysql')



module.exports = (passport) => {
    console.log('[passports/employeePassport.js]')

    passport.serializeUser(function(user, done){
      done(null, user);
    });
  
    passport.deserializeUser(function(id, done){
      User.findById(id, function(err, user){
        done(err, user);
      });
    });
    
    localEmployeeStart(passport)
}

const localEmployeeStart = (passport) => {
    //login passport

    passport.use('local-employee',
        new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {

          console.log('[passports/employeePassport.js local-employee]')

        mysql.EnterQuery(mysql.findUserByMail(email))
        .then(user => { 
          console.log(user)
          if (user.length > 0 ) {

            bcryptjs.compare(password, user[0].password, (err, isMatch) => {
                console.log(err,isMatch)
                if (err) {
                    console.log(err)
                };
                if (isMatch) {
                  return done(null, user[0]);
                } else {
                  return done(null, false, { message: 'Password incorrect' });
                }})


          } else {
            return done(null, false, { message: 'That email is not registered' });
          }
        })
        .catch(mysqlErr => {console.log(mysqlErr) })

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