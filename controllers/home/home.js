exports.getHome = (req, res, next) => {
  
  console.log(req.session)
      res.render('home/home',{
        title: "BMBY2"
      })
  
      ///mabye add more stuff to send to the ejs
    }