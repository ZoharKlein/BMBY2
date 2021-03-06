
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
 

const userRole = {
    WORKER: "worker",
    ADMINISTRATOR: "administrator",
    SUPER_ADMINISTRATOR: "super administrator",
}


const userStats = {
    WAIT_FOR_HACK: "wait for admin hack",
    APPROVED: "approved",
    SUSPENDED: "suspended",
}

module.exports.selectMenuByRole = (role) => {

    switch(role){
        case 'super administrator': {
            return sumperAdminMenuWithImg
            break
        }
        case 'administrator': {
            return adminMenuWithImg
            break
        }
        case 'worker': {
            return workerMenuWithImg
            break
        }
        default:{
            return undefined;
            break
        }
    }



}

const sumperAdminMenuWithImg = [ 
    {title: 'Home', imgURL: 'https://image.flaticon.com/icons/svg/609/609803.svg'} ,
    {title: 'Leads', imgURL: 'https://image.flaticon.com/icons/svg/1979/1979367.svg'} ,
    {title: 'Users', imgURL: 'https://www.flaticon.com/premium-icon/icons/svg/1165/1165725.svg'} ,
    {title: 'Customers', imgURL: 'https://image.flaticon.com/icons/svg/1605/1605350.svg'} ,
    {title: 'Reports', imgURL: 'https://image.flaticon.com/icons/svg/858/858699.svg'} ,
    {title: 'Settings', imgURL: 'https://image.flaticon.com/icons/svg/1055/1055683.svg'}
]

const adminMenuWithImg = [ 
    {title: 'Home', imgURL: 'https://image.flaticon.com/icons/svg/609/609803.svg'} ,
    {title: 'Leads', imgURL: 'https://image.flaticon.com/icons/svg/1979/1979367.svg'} ,
    {title: 'Users', imgURL: 'https://www.flaticon.com/premium-icon/icons/svg/1165/1165725.svg'} ,
    {title: 'Customers', imgURL: 'https://image.flaticon.com/icons/svg/1605/1605350.svg'} ,
    {title: 'Settings', imgURL: 'https://image.flaticon.com/icons/svg/1055/1055683.svg'}
]

const workerMenuWithImg = [ 
    {title: 'Home', imgURL: 'https://image.flaticon.com/icons/svg/609/609803.svg'} ,
    {title: 'Leads', imgURL: 'https://image.flaticon.com/icons/svg/1979/1979367.svg'} ,
    {title: 'Customers', imgURL: 'https://image.flaticon.com/icons/svg/1605/1605350.svg'} ,
    {title: 'Settings', imgURL: 'https://image.flaticon.com/icons/svg/1055/1055683.svg'}
]


module.exports.userRole = userRole
module.exports.userStats = userStats