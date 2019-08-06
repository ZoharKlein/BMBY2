const Payment = require('../../models/Payment')
const paymentValid = require('../../validationConfig/joiValidationConfig').paymentValid
const mongoose = require('../../db/mongoose')


exports.postPayment = (req, res, next) => {

    errArr = []
    const nowDate = new Date()

    if (req.body.pay) {

      //card Number check
      Payment.paymentCompanys.forEach(element => { 
        if (element.digit !== req.body.cardNumber.join("").length && element.name === req.body.company ) {
          // ok
          errArr.push({key:"card number", msg: "length of the number incorrect"})
          console.log("ok")
          
        }
      })
      
      if (nowDate.getFullYear() > parseInt(req.body.expDate[1]) ) {
            /// expired Date
      }
      else if (nowDate.getFullYear() === parseInt(req.body.expDate[1]) && nowDate.getMonth() + 1 >= parseInt(req.body.expDate[0]) ) {

        /// expired Date
      }
      
      const validErr = paymentValid(req.body)
      errArr = [...errArr, ...validErr]
      console.log(errArr)

      req.body.id = global.loginCustomer.id

      console.log(req.body)

      if (errArr.length > 0) {
        // render error
      } else {
        console.log(global.loginCustomer.id)
        //1. create new payment mongodb

        const newPayment = new Payment(req.body)
        
        
        newPayment.save()
        .then(result => { 

          console.log(result)
          
        })
        .catch(saveErr => { 
          console.log(saveErr)
        })

        //2. change the lane of customer
        mongoose.Customer.findByIdAndUpdate(
          mongoose.ObjectId( global.loginCustomer.id) , 
          {$set: {lane: req.body.lane, expDate: new Date(nowDate.getFullYear() + parseInt( req.body.lane) ,nowDate.getMonth() , nowDate.getDate() + 1)} }
           , ()=>{
             global.loginCustomer.lane = req.body.lane
             res.redirect('/dashboard')
           })

        //3. render the dashboard of customer



      }
    }
    else {

    const lane = Payment.payLaneMenuForCustomer[parseInt(req.body.lane) - 1]
    
    res.render('dashboard/payment',{
      title: "BMBY2 Dashboard",
      customer: global.loginCustomer,
      lane: lane,
      paymentCompany: Payment.paymentCompanys

    })
  }
    ///mabye add more stuff to send to the ejs
  }
