
const User = require('../../models/User')
const mysql = require('../../db/mysql')


exports.getUsers = (req, res, next) => {
    
    let menu

    if (global.loginEmployee === undefined) {
        menu = undefined
    } else {
        menu = User.selectMenuByRole(global.loginEmployee.role)
    }

    mysql.EnterQuery(`${mysql.findAllUsersExeptOne(global.loginEmployee.userID)} ${mysql.limitFromStartToEnd(0,10)}` )
    .then(result => {

        const listOfUsers = result
        console.log('listofusers')
        console.log(listOfUsers)


        res.render('employees/dashboard',{
            user : global.loginEmployee,
            userMenu: menu,
            content: "Users",
            users: listOfUsers
          })



    })
    .catch(err => { console.log(err) })


}