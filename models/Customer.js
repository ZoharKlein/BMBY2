const mongooseDB = require('../db/mongoose')

module.exports = class Customer {
    constructor(...parms) {
        console.log(parms[0])
        const data = parms[0]

        this.customer = mongooseDB.Customer({
            companyName: data.companyName, 
            email: data.email,
            password: data.password
        })
        
    }
     save() {
        
        this.customer.save()
        .then(result => { console.log(result) })
        .catch(err => { console.log(err) })

    }

}