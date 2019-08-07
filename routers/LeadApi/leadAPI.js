const express = require('express');
const router = express.Router();

const leadValid = require('../../validationConfig/joiValidationConfig').leadValid
const Lead = require('../../models/Lead')



router.post('/lead',(req, res,) => {

        const errArr = leadValid(req.body)
        
        if (errArr.length === 0) {
            
            const newLead = new Lead(req.body)
            
            newLead.save()
            console.log(newLead)
        
        
        
            setTimeout(() => {
                        
                // console.log(newLead)
                 res.json(newLead)
             }, 1500);
        }


    

})

    module.exports = router;