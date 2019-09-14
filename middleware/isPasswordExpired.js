module.exports = (req,res,next) => {
    
    console.log(req.session.loginUser)
    if (req.session.loginUser !== null) {

        if (req.session.loginUser.lastPasswordUpdate >= new Date() ) {
            req.session.passwordExpierd = true
            
            console.log(req.session.loginUser.lastPasswordUpdate >= new Date())
            return res.redirect('/employees/dashboard/settings')
        }  
        
        next();
    }
    next();
    
}