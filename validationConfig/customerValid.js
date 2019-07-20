


module.exports.customerValid = (...params) => {

    const errMsg = []
    const str = "aSa"

    console.log( ((/^[0-9]+$/)).test(str) )

    customer = params[0]

    //Company Name Check
    if ((customer.comapnyName.length < 2 || customer.comapnyName.length > 30) || !(/^[a-zA-Z\s]+$/).test(customer.comapnyName)) {

        err = {
            param: "companyName",
            msg: "Must have only eng letters or space and length 2 bettwin 8!"
        }
        errMsg.push(err)

    }
        //
    if ((customer.comapnyName.length < 2 || customer.comapnyName.length > 30) || !(/^[a-zA-Z\s]+$/).test(customer.comapnyName)) {

        err = {
            param: "companyName",
            msg: "Must have only eng letters or space!"
        }
        errMsg.push(err)

    }
    
    //Password Check
    if ((customer.password.length < 8 || customer.password.length > 30) || true) {

        err = {
            param: "password",
            msg: "Must have at least 1 letter and 1 digit and length 8 bettwin 30!"
        }
        errMsg.push(err)

    }

    return errMsg


}