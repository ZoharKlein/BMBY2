
const mysql = require('../db/mysql')


module.exports = class User {

    constructor(...parms) {
        const user = parms[0]

        this.firstname = user.firstname
        this.lastname = user.lastname
        this.password = user.hash
        this.email = user.email
        this.mobile = user.mobile
        this.city = user.city
        this.birthday = user.birthday
        this.role = userRole.WORKER
        this.stats = userStats.WAIT_FOR_HACK
        
        
    }
    insertNewUser() {
        mysql.GetDataFromMySQL(mysql.insertNewUser(this))
        .then(result => { console.log (this, " Enterd to db")})
        .catch(err => { console.log(err) })

    }

}
exports.userRole = userRole = {
    SUPER_ADMINISTRATOR: "super administrator",
    ADMINISTRATOR: "administrator",
    WORKER: "worker"
}


exports.userStats = userStats = {
    WAIT_FOR_HACK: "wait for admin hack",
    APPROVED: "approved",
    SUSPENDED: "suspended",
}

