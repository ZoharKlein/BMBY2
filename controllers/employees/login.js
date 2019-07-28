
exports.getLogin = (req, res, next) => {

    res.render('employees/login',{
      title: "Login",
      signUpData : {
        comapnyName : "",
        email: "",
      }
    })

  }