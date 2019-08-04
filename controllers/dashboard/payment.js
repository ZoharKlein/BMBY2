const payment = require('../../models/Payment')

exports.postPayment = (req, res, next) => {
    const lane = payment.payLaneMenuForCustomer[parseInt(req.body.lane) - 1]
    console.log(lane)
  
    res.render('dashboard/payment',{
      title: "BMBY2 Dashboard",
      customer: global.loginCustomer,
      lane: lane,
      paymentCompany: payment.paymentCompany

      
      

    })

    ///mabye add more stuff to send to the ejs
  }
