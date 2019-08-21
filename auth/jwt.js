module.exports.verfiyToken = (req,res,next) => {
    const bearerHeadr = req.headers['authorization']

    if (typeof bearerHeadr !== undefined) {
      console.log("ok")
      const bearer = bearerHeadr.split(' ')

      const bearerToken = bearer[1]

      req.token = bearerToken

      next()

    } else {
      console.log("not ok")
    }
  }