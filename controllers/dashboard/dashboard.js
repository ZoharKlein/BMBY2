
const Payment = require('../../models/Payment')
 
exports.getDashboard = (req, res, next) => {
  
      res.render('dashboard/dashboard',{
        title: "BMBY2 Dashboard",
        customer: global.loginCustomer,
        laneMenu: Payment.payLaneMenuForCustomer
        

      })
  
      ///mabye add more stuff to send to the ejs
    }

