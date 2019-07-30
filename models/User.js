
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
        mysql.EnterQuery(mysql.insertNewUser(this))
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

module.exports.selectMenuByRole = (role) => {

    switch(role){
        case 'super administrator': {
            return superAdmin
            break
        }
        case 'administrator': {
            return admin
            break
        }
        case 'worker': {
            return worker
            break
        }
        default:{
            return undefined;
            break
        }
    }



}

const superAdmin = ['Dashboard','Leads','Users','Reports','Settings','Logout']
const admin = ['Dashboard','Leads','Reports','Settings','Logout']
const worker = ['Dashboard','Leads','Settings','Logout']

exports.allMenuItems = {
    dashboard: 'Dashboard',
    leads: 'Leads',
    users: 'Users',
    reports: 'Reports',
    settings: 'Settings',
    logout: 'Logout'

}
