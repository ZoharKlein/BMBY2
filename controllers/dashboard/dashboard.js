
const payLaneMenuForCustomer  = [
  {timeLength: 1,
  price: 49.99,
  coin: '$',
  details: ["1. bla bla bla", "2. bla bla bla","3. bla bla bla"]
  },
  {timeLength: 2,
      price: 89.99,
      coin: '$',
      details: ["1. bla bla bla", "2. bla bla bla","3. bla bla bla"]
      },
  {timeLength: 3,
      price: 129.99,
      coin: '$',
      details: ["1. bla bla bla", "2. bla bla bla","3. bla bla bla"]
  }
]


exports.getDashboard = (req, res, next) => {
  
    console.log(payLaneMenuForCustomer)

      res.render('dashboard/dashboard',{
        title: "BMBY2 Dashboard",
        customer: global.loginCustomer,
        laneMenu: payLaneMenuForCustomer
        

      })
  
      ///mabye add more stuff to send to the ejs
    }

