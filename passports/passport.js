const LocalStrategy = require('passport-local').Strategy;

const bcrypt = require('bcryptjs');
const mySQLDB = require('../db/mysql')


module.exports = (passport) => {
    localstart(passport)
        //googlestrat(passport)
}

function localstart(passport) {
    //login passport
    passport.use('local-login',
        new LocalStrategy({ usernameField: 'username' }, (username, password, done) => {
            // Match user

            console.log(username, password)

            mySQLDB.GetDataFromMySQL("SELECT * FROM users WHERE username = '" + username + "'")
                .then(data => {
                    console.log(data)

                    if (data.length === 0) {
                        return done(null, false, { message: 'Username incorrect' });

                    } else {
                        bcrypt.compare(password, data[0].password, (err, isMatch) => {
                            if (err) {
                                console.log(err)
                                throw err
                            }
                            if (isMatch) {
                                console.log('match')
                                return done(null, data[0]);
                            } else {
                                console.log('no match')
                                return done(null, false, { message: 'Password incorrect' });
                            }
                        })
                    }
                })
                .catch(err => { console.log(err) })

        }))


    /*
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });
    */

};