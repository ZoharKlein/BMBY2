
const User = require('../../models/User')


exports.getDashboard = (req, res, next) => {

    if (req.session.loginUser.lastPasswordUpdate >= new Date() ) {
        res.redirect('/employees/dashboard/settings')
    }
    else {

    let menu

    if (req.session.loginUser === undefined) {
        menu = undefined
    } else {
        menu = User.selectMenuByRole(req.session.loginUser.role)
    }

    console.log("dashboard", req.session)
    res.render('employees/dashboard',{
        user : req.session.loginUser,
        userMenu: menu,
        content: "Home"
      })
    }
}

exports.getDashboardHome = (req, res, next) => {
 
    res.redirect('/employees/dashboard')

}