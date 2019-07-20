exports.getHome = (req, res, next) => {

    console.log('about')
      res.render('home/home',{
        title: "BMBY2"
      })
  
      ///mabye add more stuff to send to the ejs
    }