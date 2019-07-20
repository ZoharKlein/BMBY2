exports.getContactUs = (req, res, next) => {
        
    res.render('home/contactUs',{
            title: "Contact"
        })
    }

exports.postContactUs = (req, res, next) => {

        console.log('post contactUs')
        console.log(req.body)


        res.render('home/contactUs',{
            title: "Contact",
            send: true
        })
          
            //send the message to info@bmby2.com
    }