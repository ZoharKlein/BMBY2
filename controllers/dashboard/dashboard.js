
const Payment = require('../../models/Payment')
 
exports.getDashboard = (req, res, next) => {

  console.log(req.session)
  if (req.session.passport !== undefined) {
    req.session.loginCustomer = req.session.passport.user 
  }
  //console.log("session", req.session.loginCustomer)
      res.render('dashboard/dashboard',{
        title: "BMBY2 Dashboard",
        customer: req.session.loginCustomer,
        laneMenu: Payment.payLaneMenuForCustomer,
        content: "Home",
        expDate: new Date() > req.session.loginCustomer.expDate ? true : false
        
      })
  
      ///mabye add more stuff to send to the ejs
    }

