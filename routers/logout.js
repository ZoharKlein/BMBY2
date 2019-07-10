const express = require('express');
const router = express.Router();
const passport = require('passport')

require('../passports/passport')(passport);


router.post('/logout', (req, res) => {
    req.logout();
    res.redirect('/')
})


module.exports = router;