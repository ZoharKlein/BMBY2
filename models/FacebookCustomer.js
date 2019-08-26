const mongooseDB = require('../db/mongoose')

module.exports = class Customer {


    constructor(...parms) {
        const data = parms[0]
        console.log(parms)
        this.facebookCoustomer = mongooseDB.FacebookCoustomer({
            companyName: data.companyName, 
            facebookID: data.facebookID,
            email:data.email,
            expDate: new Date(),
            lane: 'None'
        })
        
    }



     save() {
        let customerInDB = false

                return this.facebookCoustomer.save()
                .then(saveResult => {
                    // console.log(saveResult)
                    return true
                })
                .catch(saveErr => { 
                    console.log(saveErr)
                    if (saveErr.code === 11000) {
                        return "You are allready sign up."
                    }

                    return "Error, please try next time."
                    })
                
            }
        
        
}