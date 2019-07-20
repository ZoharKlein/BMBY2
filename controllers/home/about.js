exports.getAbout = (req, res, next) => {

    res.render('home/about',{
      title: "About"
    })

    ///mabye add more stuff to send to the ejs
  }