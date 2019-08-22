exports.postLogout = (req, res, next) => { 

        req.logout();
        req.session.destroy()
        res.redirect('/');

  }