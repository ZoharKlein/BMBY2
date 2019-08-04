const Joi = require('@hapi/joi');

//change the script name


const joiValDef = {
    bigLetterFirst_aToz_2To20: Joi.string().regex(/^[a-zA-z]+[A-Za-z\s]{2,20}$/),
    bigLetterFirst_aToz_2To30: Joi.string().regex(/^[a-zA-z]+[A-Za-z\s]{2,30}$/),
    text_20To4000: Joi.string().min(20).max(100),
    text_10To50: Joi.string().min(10).max(50),
    phone_plusAnd1To3Prefix_9dgigit: Joi.string().regex(/[(+]?[0-9]{1,3}[)]?[0-9]{9}$/),
    email_standard: Joi.string().email({ minDomainSegments: 2 }),
    password_leterAndNumberMost_8To30: Joi.string().regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,30}$/),
    digit1To100: Joi.number().min(1).max(100),
}



const userSchema = Joi.object().keys({
    firstname: joiValDef.bigLetterFirst_aToz_2To20.error(() => 'First name must have only letters!'),
    lastname: joiValDef.bigLetterFirst_aToz_2To20.error(() => 'Last name must have only letters!'),
    city: joiValDef.bigLetterFirst_aToz_2To30.error(() => 'City must have only letters!'),
    mobile: joiValDef.phone_plusAnd1To3Prefix_9dgigit.error(() => 'Phone must have (+972) prefix and 9 digit!'),
    email: joiValDef.email_standard.error(() => 'Example : email@company.com '),
    password: joiValDef.password_leterAndNumberMost_8To30.error(() => 'Must have at least letter and digit'),

})


const leadSchema = Joi.object().keys({
    firstname: joiValDef.bigLetterFirst_aToz_2To20,
    lastname: joiValDef.bigLetterFirst_aToz_2To20,
    city: joiValDef.bigLetterFirst_aToz_2To30,
    mobile: joiValDef.phone_plusAnd1To3Prefix_9dgigit,
    email: joiValDef.email_standard,
    cid: joiValDef.digit1To100,
    title: joiValDef.text_10To50,
    msg: joiValDef.text_20To4000,


})


const customerSchema = Joi.object().keys({
    companyName: joiValDef.bigLetterFirst_aToz_2To20.error(() => 'Company name must have only letters'),
    email: joiValDef.email_standard.error(() => 'Example : email@company.com '),
    password: joiValDef.password_leterAndNumberMost_8To30.error(() => 'Must have at least letter and digit'),


})


module.exports.customerValid = (...parms) => {
    
    const customer = parms[0]
    let errArr = []

    Joi.validate({
        companyName: customer.companyName,
        email: customer.email,
        password: customer.password,
        
    }, customerSchema, {abortEarly: false} ,(err, value) => {

    if (err) {
        console.log(err)
        let i = 0
        err.details.forEach(element => { 

            if (i % 2 === 0) {

            errObject = {
                msg: element.message,
                key: element.path[0]
            }
            errArr.push(errObject)
            
        }
        
        })
        
}})
console.log(errArr)
return errArr
}
    
module.exports.userValid = (...parms) => {
    
    const user = parms[0]
    let errArr = []
    //console.log(user)

    Joi.validate({
        firstname: user.firstname,
        lastname: user.lastname,
        city: user.city,
        mobile: user.mobile,
        email: user.email,
        password: user.password    
        
    }, userSchema, {abortEarly: false} ,(err, value) => {

    if (err) {
        //console.log(err)
        let i = 0
        err.details.forEach(element => { 

            if (i % 2 === 0) {

            errObject = {
                msg: element.message,
                key: element.path[0]
            }
            errArr.push(errObject)
        }
        
        })
        
}})
console.log(errArr)
return errArr
}

module.exports.updateUserValid = (...parms) => {
    
    const user = parms[0]
    let errArr = []
    //console.log(user)

    Joi.validate({
        firstname: user.firstName,
        lastname: user.lastName,
        city: user.city,
        mobile: user.mobile,
        email: user.email,   
        
    }, userSchema, {abortEarly: false} ,(err, value) => {

    if (err) {
        //console.log(err)
        let i = 0
        err.details.forEach(element => { 

            if (i % 2 === 0) {

            errObject = {
                msg: element.message,
                key: element.path[0]
            }
            errArr.push(element.message)
        }
        
        })
        
}})
if (errArr.length === 0) {
    errArr = undefined
}
console.log(errArr)
return errArr
}



module.exports.passwordValid = (password) => {
    
    let errArr
    //console.log(user)

    Joi.validate({
    password: password 
        
    }, userSchema, {abortEarly: false} ,(err, value) => {

    if (err) {
        //console.log(err)
        errArr = err
        console.log(errArr)
        return errArr.details[0].message
        
        }
    }) 
        


}

/** lead fields
 * 
 * cid - company id
 * title - lead title
 * firstname - first name of the sender
 * lastname - last name of the sender
 * email - email of the sender
 * mobile - phone number of the sender
 * city - city of the sender
 * msg -  a text from the sender
 * date - current date the lead sent 
 * 
 *  */


module.exports.Joi = Joi
module.exports.userSchema = userSchema
module.exports.leadSchema = leadSchema