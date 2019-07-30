module.exports.User = class User {

    constructor(firstName, lastName, password, email, phoneNumber, ) {

        this.firstName = firstName
        this.lastName = lastName
        this.password = password
        this.email = email
        this.phoneNumber = phoneNumber


    }
}
exports.userRole = {
    SUPER_ADMINISTRATOR: "super administrator",
    ADMINISTRATOR: "administrator",
    WORKER: "worker"
}


exports.userStats = {
    WAIT_FOR_HACK: "wait for admin hack",
    APPROVED: "approved",
    SUSPENDED: "suspended",
}


exports.selectMenuByRole = (role) => {

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
