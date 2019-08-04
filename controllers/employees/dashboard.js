
const User = require('../../models/User')


exports.getDashboard = (req, res, next) => {

    let menu

    if (global.loginEmployee === undefined) {
        menu = undefined
    } else {
        menu = User.selectMenuByRole(global.loginEmployee.role)
    }

    res.render('employees/dashboard',{
        user : global.loginEmployee,
        userMenu: menu,
        content: "Home"
      })

}

exports.getDashboardHome = (req, res, next) => {
 
    res.redirect('/employees/dashboard')

}