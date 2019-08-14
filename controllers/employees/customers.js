
const User = require('../../models/User')
const mysql = require('../../db/mysql')
const mongoose = require('../../db/mongoose')

const sortSelector = {
    selector: [ {orderBy:'firstName', view:'First Name'},{orderBy:'lastName', view:'Last Name'},{orderBy:'email', view:'Email'}],
    selected: 'firstName'
}

const paging = {
    next: false,
    prev: false,
    pageIndex: 0,
    itemPerPage: 10
}

exports.getCustomers = (req, res, next) => {

    mongoose.Customer.find()
    .then(result => { console.log(result) })
    .catch(err => { console.log(err) })
    
    let menu

    if (global.loginEmployee === undefined) {
        menu = undefined
    } else {
        menu = User.selectMenuByRole(global.loginEmployee.role)
    }

    res.render('employees/dashboard',{
        user : global.loginEmployee,
        userMenu: menu,
        content: "Customers",
      })



}