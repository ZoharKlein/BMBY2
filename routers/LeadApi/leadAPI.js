const express = require('express');
const router = express.Router();
const mysql = require('../../db/mysql')

const leadValid = require('../../validationConfig/joiValidationConfig').leadValid
const Lead = require('../../models/Lead')



router.post('/lead',(req, res,) => {

        const errArr = leadValid(req.body)
        
        if (errArr.length === 0) {


        mysql.EnterQuery(`${mysql.findAllUsersId} ${mysql.orderBy('RAND()')} ${mysql.limitNumberOfResult(1)}` )
        .then(userID => { 

            req.body.userID = userID[0].userID
            console.log(req.body)
            const newLead = new Lead(req.body)
            
            newLead.save()
            console.log(newLead)

            setTimeout(() => {
                        
                // console.log(newLead)
                 res.json(newLead)
             }, 1000);



        } )
        .catch(saveErr => { console.log( saveErr )}) 
        

        }


    

})

    module.exports = router;