const mysql = require('../../db/mysql')
const userValid = require('../../validationConfig/joiValidationConfig').userValid
const User = require('../../models/User')
const bycriptjs = require('bcryptjs')



exports.getSettings = (req, res, next) => {

    res.render('employees/dashboard',{
        user : global.loginEmployee,
        userMenu: User.selectMenuByRole(global.loginEmployee.role),
        content: "Settings"
      })

}

exports.postSettings = (req, res, next) => {

    const option = req.body.update
    console.log(option)

    switch (option) {
        case 'img': {
            const imgURL = req.body.imgURL
            if(imgURL===""){
                //return err to user
            }
            else {
                mysql.EnterQuery(mysql.updateProfileImgByID(imgURL,global.loginEmployee.userID))
                .then(result => 

                    setTimeout(() => {
                        res.render('employees/dashboard',{
                            user : global.loginEmployee,
                            userMenu: User.selectMenuByRole(global.loginEmployee.role),
                            content: "Settings"
                          })
                    }, 1500)

                )
                .catch(err => { console.log(err) })
                
            }
            break;
        }
        case 'details': {
            
            break;
        }
        case 'password': {
            
            break;
        }
        default : {
            res.render('employees/dashboard',{
                user : global.loginEmployee,
                userMenu: User.selectMenuByRole(global.loginEmployee.role),
                content: "Settings"
              })
            break;
        }
    }



}

