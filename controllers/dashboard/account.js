
const Payment = require('../../models/Payment')
 
exports.getAccount = (req, res, next) => {

     const nowDate = new Date()
     const daysLeft = Math.ceil(Math.abs(nowDate.getTime() - req.session.loginCustomer.expDate.getTime()) / (1000 * 60 * 60 * 24));

  
      res.render('dashboard/dashboard',{
        title: "BMBY2 Dashboard",
        customer: req.session.loginCustomer,
        laneMenu: Payment.payLaneMenuForCustomer,
        content: 'My Account',
        daysLeft: daysLeft,
        expDate: new Date() > req.session.loginCustomer.expDate ? true : false

        

      })
  
      ///mabye add more stuff to send to the ejs
    }

