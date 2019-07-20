exports.getLogin = (req, res, next) => {

    res.render('home/login',{
        title: "Login",
        loginData : {
          comapnyName : req.body.companyName,
          password: req.body.password,
        }
      })

  }

exports.postLogin = (req, res, next) => {

}



