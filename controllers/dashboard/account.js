
const Payment = require('../../models/Payment')
 
exports.getAccount = (req, res, next) => {

     const nowDate = new Date()
     const daysLeft = Math.ceil(Math.abs(nowDate.getTime() - global.loginCustomer.expDate.getTime()) / (1000 * 60 * 60 * 24));

  
      res.render('dashboard/dashboard',{
        title: "BMBY2 Dashboard",
        customer: global.loginCustomer,
        laneMenu: Payment.payLaneMenuForCustomer,
        content: 'My Account',
        daysLeft: daysLeft

        

      })
  
      ///mabye add more stuff to send to the ejs
    }

