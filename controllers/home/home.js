const Colors = require('../../config/consoleColors').Colors

exports.getHome = (req, res, next) => {

  console.log(Colors.FgBlue,"[controllers/home/home.js] Get")
  
  //console.log(req.session)
      res.render('home/home',{
        title: "BMBY2"
      })
  
      ///mabye add more stuff to send to the ejs
    }