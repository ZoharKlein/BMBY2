exports.getDashboard = (req, res, next) => {

    console.log('about')

      res.render('dashboard/dashboard',{
        title: "BMBY2 Dashboard",
        customer: global.loginCustomer

      })
  
      ///mabye add more stuff to send to the ejs
    }