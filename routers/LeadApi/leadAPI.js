const express = require('express');
const router = express.Router();
const registrationCheaker = require('../../validationConfig/joiValidationConfig')
const Lead = require('../../model/lead')
const mongooseDB = require('../../db/mongoose')
const mySQLDB = require('../../db/mysql')

var extractDuplicateField = require('mongoose-extract-duplicate-field');



router.post('/api/lead/:cid',(req, res,) => {
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
            
                newLead = mongooseDB.Lead({
                    firstname: value.firstname,
                    lastname: value.lastname,
                    email: value.email,
                    mobile: value.mobile,
                    city: value.city,
                    cid: value.cid,
                    msg: value.msg,
                    title: value.title,
                    date: new Date()

                })
                newLead.save().then(result => {
                   //  console.log(result) 


                     const sqlCommand = `SELECT userID FROM users
                     ORDER BY RAND()
                     LIMIT 1`

                     mySQLDB.GetDataFromMySQL(sqlCommand).then(sqlResult => {

                        newLeadProcess = mongooseDB.LeadProcess({
                            lead_id: result._id,
                            user_id: sqlResult[0].userID, 
                            now_status: Lead.leadStatus.new,
                            last_date_modified: new Date(),
                        })

                        
                        newLeadProcess.save()
                        .then(LeadProcessResult => { console.log(LeadProcessResult) })
                        .catch(LeadProcessErr => { console.log(LeadProcessErr) })

                     }).catch(sqlErr => {console.log(sqlErr)})
                    
                


                    })
                     .catch(saveErr => {console.log(err) })

                    setTimeout(() => {
                        
                       // console.log(newLead)
                        res.json(newLead)
                    }, 1500);
            }


        })

    })

    module.exports = router;