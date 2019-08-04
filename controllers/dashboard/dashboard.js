
const payLaneMenuForCustomer = require('../../models/Payment').payLaneMenuForCustomer
 
exports.getDashboard = (req, res, next) => {
  
      res.render('dashboard/dashboard',{
        title: "BMBY2 Dashboard",
        customer: global.loginCustomer,
        laneMenu: payLaneMenuForCustomer
        

      })
  
      ///mabye add more stuff to send to the ejs
    }

