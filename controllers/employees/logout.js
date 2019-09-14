exports.postLogout = (req, res, next) => {
    console.log('[controllers/employees/logout.js post]')

    req.logout();
    req.session.destroy()
    res.redirect('/');

}