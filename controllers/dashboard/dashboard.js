
const payLaneMenuForCustomer  = [
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


exports.getDashboard = (req, res, next) => {
  
      res.render('dashboard/dashboard',{
        title: "BMBY2 Dashboard",
        customer: global.loginCustomer,
        laneMenu: payLaneMenuForCustomer
        

      })
  
      ///mabye add more stuff to send to the ejs
    }

