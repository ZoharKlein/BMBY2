const mongooseDB = require('../db/mongoose')

module.exports = class Payment {
    constructor(...params) {
        const data = params[0]

        this.payment = mongooseDB.Payment({

            user_id: new mongooseDB.ObjectId(data.id) ,
            fullName: data.company,
            cardNumber: data.cardNumber.join(""),
            expDate: new Date(data.expDate[1], parseInt(data.expDate[0]) + 1 , 1),
            amount:data.pay[1],
            coin: data.pay[0],
            date : new Date(),
        })
        
    }


    save() {
        let paymentInDB = false

                return this.payment.save()
                .then(saveResult => {
                    console.log(saveResult)
                    return true
                })
                .catch(saveErr => { 
                    console.log(saveErr.code)
                    if (saveErr.code === 11000) {
                        return "all ready pay."
                    }

                    return "Error, please try next time."
                    })
                
            }

  }

module.exports.payLaneMenuForCustomer  = [
    {timeLength: 1,
    price: 49.99,
    coin: '$',
    details: ["bla bla bla", "bla bla bla","bla bla bla"]
    },
    {timeLength: 2,
        price: 89.99,
        coin: '$',
        details: ["bla bla bla", "bla bla bla","bla bla bla"]
        },
    {timeLength: 3,
        price: 129.99,
        coin: '$',
        details: ["bla bla bla", "bla bla bla","bla bla bla"]
    }
  ]


  module.exports.paymentCompanys = [
      {name: "MasterCard" , logoURL: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKj33wpeN1hnTwUft6lBdt7dTu_osMn6vSUiLP23MgxDBNW5wG" , digit: 16},
      {name: "American Express" , logoURL: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/American_Express_logo_%282018%29.svg/1200px-American_Express_logo_%282018%29.svg.png" , digit: 15},
      {name: "Diner's Club" , logoURL: "https://pbs.twimg.com/profile_images/520311336152993793/c95wAX8q_400x400.jpeg" , digit: 14}
  ]