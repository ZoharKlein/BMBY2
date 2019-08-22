module.exports = getNewPassword = () => {
    const str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*'

    let newpass = ""

    for (i = 0 ; i < 10 ; i++ ) {
        newpass += str[Math.floor(Math.random() * str.length)]
    }
    console.log(newpass)
    return newpass

}