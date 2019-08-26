module.exports = (req,res,next) => {
    
    if (req.session.loginUser.lastPasswordUpdate <= new Date() ) {
        req.session.passwordExpierd = true
        
        console.log(req.session.loginUser.lastPasswordUpdate >= new Date())
        return res.redirect('/employees/dashboard/settings')
    }  

        next();
    
}