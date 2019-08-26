const LocalStrategy = require('passport-local').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const bcrypt = require('bcryptjs');
const mySQLDB = require('../db/mysql')
const mongooseDB = require('../db/mongoose')

//const passport = require('passport')

module.exports = (passport) => {
    localstart(passport)
    //googlestrat(passport)
    facebookstart(passport)
}

const localstart = (passport) => {
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





const facebookstart = (passport) => {
    //login passport
    passport.use('facebook',
    new FacebookStrategy({
        clientID: '460795267803255',
        clientSecret: '9a4626e822aba65c5242fa5269ae847b',
        callbackURL: "http://localhost:3000/auth/facebook/callback",
        //profileFields: ['id', 'displayName', 'photos', 'email',]
      },
      (accessToken, refreshToken, profile, done) => {  

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




/*
app.get('/customers/auth/facebook', passport.authenticate('facebook') );

app.get('/auth/facebook/callback',
  passport.authenticate('facebook', { successRedirect: '/customers',
                                      failureRedirect: '/login' }));
*/


/*
passport.use(mongooseDB.Customer.createStrategy());

passport.serializeUser(mongooseDB.Customer.serializeUser());
passport.deserializeUser(mongooseDB.Customer.deserializeUser());
*/


//google/

const googlestrat = (passport) => {

passport.use('google', new GoogleStrategy({
    clientID: '674767443046-4ckuvpvv212ra8b13nkit4lo2shat2ga.apps.googleusercontent.com',
    clientSecret: 'QfHMkIBrcGclvaIcMbu6WMxt',
    callbackURL: "http://localhost:3000/customers/auth/google/",
    userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo"
  },
  (accessToken, refreshToken, profile, cb) => {

    console.log(profile.id)

    mongooseDB.Customer.find({googleID:profile.id},(err,result)=> {

        if(err) {
            console.log('errror' + err)
            return cb(err,false,'find');
        }else {
            console.log(profile)

            if (result.length === 0) {
            
            newCustomer = mongooseDB.Customer({
                username: profile.displayName,
                password: accessToken,
                googleID: profile.id,
            })
            newCustomer.save()
             return cb(null, newCustomer);
        
            }
            else {
                console.log('in the system')
                //console.log(result)
                cb(result,cb);
            }
            
        }})
  },passport.serializeUser(function(user, done) {
    done(null, user);
  }),
  
  passport.deserializeUser(function(user, done) {
    done(null, user);
  })

  
)
)
    
}
