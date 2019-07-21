exports.postLogout = (req, res, next) => { 

        req.logout();
        global.loginCustomer = undefined
        res.redirect('/');

  }