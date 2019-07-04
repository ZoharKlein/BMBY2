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