const bcryptjs = require('bcryptjs')
const Colors = require('../config/consoleColors').Colors


module.exports.compare = (password,hash) => {

  
    console.log(Colors.FgBlue,'[auth/bcryptjs.js]')
    bcryptjs.compare(password,hash , (err, isMatch) => {

    if (err) {
        console.log(Colors.FgRed, "bcryptjs err", err)
        return false
      
      } else {
        if (isMatch) {
            console.log(Colors.FgWhite, "bcryptjs done", isMatch)
            return true
        } else {
            console.log(Colors.FgRed, "bcryptjs err not the same password", err)
            return false
        }
       }
       //console.log(vadlid)
    })

}