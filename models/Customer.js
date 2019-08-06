const mongooseDB = require('../db/mongoose')

module.exports = class Customer {


    constructor(...parms) {
        const data = parms[0]

        this.customer = mongooseDB.Customer({
            companyName: data.companyName, 
            email: data.email,
            password: data.password,
            expDate: new Date(),
            lane: 'None'
        })
        
    }



     save() {
        let customerInDB = false

                return this.customer.save()
                .then(saveResult => {
                    // console.log(saveResult)
                    return true
                })
                .catch(saveErr => { 
                    console.log(saveErr.code)
                    if (saveErr.code === 11000) {
                        return "You are allready sign up."
                    }

                    return "Error, please try next time."
                    })
                
            }
        
        
}