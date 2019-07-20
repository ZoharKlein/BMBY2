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
    firstname: joiValDef.bigLetterFirst_aToz_2To20,
    lastname: joiValDef.bigLetterFirst_aToz_2To20,
    city: joiValDef.bigLetterFirst_aToz_2To30,
    mobile: joiValDef.phone_plusAnd1To3Prefix_9dgigit,
    email: joiValDef.email_standard,
    password: joiValDef.password_leterAndNumberMost_8To30,

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
    comapnyName: joiValDef.bigLetterFirst_aToz_2To20.error(() => 'Company name must have only letters'),
    email: joiValDef.email_standard.error(() => 'Example : email@company.com '),
    password: joiValDef.password_leterAndNumberMost_8To30.error(() => 'Must have at least letter and digit'),


})




module.exports.customerValid = (...parms) => {
    
    const customer = parms[0]
    let errArr = []

    Joi.validate({
        comapnyName: customer.comapnyName,
        email: customer.email,
        password: customer.password,
        
    }, customerSchema, {abortEarly: false} ,(err, value) => {

    if (err) {
        
        err.details.forEach(element => { 
  
            errObject = {
                msg: element.message,
                key: element.path[0]
            }
            errArr.push(errObject)
        })
        
}})

return errArr
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