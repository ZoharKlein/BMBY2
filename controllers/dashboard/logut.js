exports.postLogout = (req, res, next) => { 

        req.logout();
        global.loginCustomer = undefined
        req.session.destroy()
        res.redirect('/');

  }