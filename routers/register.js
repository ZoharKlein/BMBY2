const express = require('express');
const router = express.Router();
const passport = require('passport')
const mySQLDB = require('../db/mysql')
const registrationCheaker = require('../validationConfig/joiValidationConfig')
const bcrypt = require('bcryptjs');
const User = require('../model/user')

require('../passports/passport')(passport);



router.post('/register', (req, res, next) => {

    const date = new Date()
    registerValid = false


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


        
                mySQLDB.GetDataFromMySQL("SELECT * FROM users WHERE email = '" + req.body.email + "'")
                    .then(data => {
                        console.log(data)
                        if (data.length !== 0) {
                            console.log('email allready exist')
                        } else {
                            //bcrypt.hash(req.body.password, 10, (err, hash) => {
                                bcrypt.hash(req.body.password, global.config.get('Dev.dbConfig.bycripts').salt , (err, hash) => {
                                

                                if (err) {
                                    console.log(err)
                                } else {
                                    const password = hash
                                    const firstname = req.body.firstname
                                    const lastname = req.body.lastname
                                    const email = req.body.email
                                    const mobile = req.body.mobile
                                    const city = req.body.city
                                    const status = User.userStats.WAIT_FOR_HACK
                                    const regDate = new Date()
                                    const birthDay = req.body.birthday
                                    const lastPassword = new Date()
                                    const role = User.userRole.WORKER

                                    //create username
                                    mySQLDB.GetDataFromMySQL(`(select max(userID) as id from  users)
                                    union
                                    (SELECT count(*) as count
                                    FROM users WHERE username LIKE '${req.body.firstname}${req.body.lastname}%')`)
                                        .then(data => {
                                            username = `${req.body.firstname}${req.body.lastname}`


                                            const sameUsername = data[1].id
                                            const newID = data[0].id + 1

                                            //ussrname is not in database
                                            if (sameUsername !== 0) {
                                                username = `${req.body.firstname}${req.body.lastname}${sameUsername}`

                                            }


                                            //problem with id
                                            const insertIntoSql = `INSERT INTO users 
                                    (
                                        userID,
                                        username, 
                                        firstName,
                                        lsatName,
                                        city,
                                        mobile,
                                        email,
                                        password,
                                        role,
                                        status,
                                        birthday,
                                        dateRegistered,
                                        lastPassword,
                                        lastPasswordUpdate,
                                        profileImg
                                        ) 
                                    VALUES 
                                    (
                                        ${newID},
                                        '${username}',
                                        '${firstname}',
                                        '${lastname}',
                                        '${city}',
                                        '${mobile}',
                                        '${email}',
                                        '${hash}',
                                        '${role}',
                                        '${status}',
                                        '${birthDay}',
                                        CURDATE(),
                                        '${hash}',
                                        CURDATE(),
                                        'https://image.flaticon.com/icons/svg/149/149071.svg'
                                          );
                                    `

                                            mySQLDB.InsertDataFromMySQL(insertIntoSql).then(result => { 
                                                console.log(result) 
                                                registerValid = true
                                                console.log(registerValid)
                                                
                                            }).catch(err => { console.log(err) })



                                        }).catch(err => { console.log(err) })
                                }
                            });
                        }
                    })
                    .catch(err => { console.log(err) })

                    setTimeout(() => {

                    console.log(registerValid)


                    if (registerValid) {
                        ///need to change
                        console.log("ok")
                        res.render('login',{loginUsername:username,password:req.body.password})
                    }
                    else {
                        res.render('register')
                    }
                    
                    }, 1500);



                /// add user to database with status - "wait for admin hack"/ after that render dashboard of the userx

                /*
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

                                console.log(newUser)*/
            }
        });
    }
})

module.exports = router;