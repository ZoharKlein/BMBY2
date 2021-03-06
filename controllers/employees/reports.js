
const User = require('../../models/User')
const mysql = require('../../db/mysql')
const mongoose = require('../../db/mongoose')
const Lead = require('../../models/Lead')

const now = new Date()


exports.getReports = (req, res, next) => {
    if (req.session.loginUser.lastPasswordUpdate >= new Date() ) {
        res.redirect('/employees/dashboard/settings')
    }
    else {

    let menu

    if (req.session.loginUser === undefined) {
        menu = undefined
    } else {
        menu = User.selectMenuByRole(req.session.loginUser.role)
    }
    
    //const a = `${now.getFullYear()}-${now.getMonth() + 1}-01`
    //const b = `${now.getFullYear()}-${now.getMonth() + 2}-01`

    const a = '2019-7-01'
    const b = '2019-10-01'


    console.log(a,b)

    mongoose.Lead.find({ date: {
        $gte: a,
        $lte: b}
    })
    .then(result => {

        stats = statistics(result)
        console.log(stats)

        const userids = stats.leadPerUser.map(element => {
            return element.userID
        }).join(', ')

        console.log(userids)
        
        mysql.EnterQuery(mysql.findListOfFirstnameLastnameByID(userids))
        .then(users => {
            
            stats.leadPerUser.forEach(element => {
                const username = users.find(user => {
                    if (element.userID === user.userID){
                        return `${user.firstName} ${user.lastName}`
                    }
                })
                element.username = `${username.firstName} ${username.lastName}`
            })
            
            res.render('employees/dashboard',{
                user : req.session.loginUser,
                userMenu: menu,
                content: "Reports",
                stats: stats
              })

            console.log(users)
        })
        .catch(err => {
            console.log(err)
        })



    
        // res.render('employees/dashboard',{
        //     user : req.session.loginUser,
        //     userMenu: menu,
        //     content: "Reports",
        //     stats: stats
        //   })
    
    })
    .catch(err => {console.log(err)} )
}

}

const statistics = (list) => {

    const numberOfLeads = list.length
    let sumStatus = {
        newLead: 0,
        finsh: 0,
        waitForAdmin: 0,
        waitForClientAnswer: 0
    }

    const leadUserIDarr = []
    let found = false

    list.map(element => {

        leadUserIDarr.find(element1 => {
            if (element1.userID === element.userID){
                element1.leads++
                element1.nowStatus = [...element1.nowStatus, element.now_status]
                found = true
            }
        })
        if (!found) {
            leadUserIDarr.push({userID: element.userID, leads : 1, nowStatus : [element.now_status] })

        }
        found = false

        switch (element.now_status){

            case Lead.leadStatus.newLead:{
                sumStatus.newLead++
                break
            }
            case Lead.leadStatus.finsh:{
                sumStatus.finsh++
                break
            }
            case Lead.leadStatus.waitForAdmin:{
                sumStatus.waitForAdmin++
                break
            }
            case Lead.leadStatus.waitForClientAnswer:{
                sumStatus.waitForClientAnswer++
                break
            }
            default: {
                break;
            }
        }

    })


    console.log(numberOfLeads, leadUserIDarr, sumStatus)

    return stats = {
        countOfLeads: numberOfLeads,
        leadPerUser: leadUserIDarr,
        sumNowStatus: sumStatus

    }


}


// mysql.EnterQuery(mysql.findListOfFirstnameLastnameByID(userids))
// .then(users => {
    


//     leadUserIDarr.forEach(element => {
//         const username = users.find(user => {
//             if (element.userID === user.userID){
//                 return `${user.firstName} ${user.lastName}`
//             }
//         })
//         element.username = `${username.firstName} ${username.lastName}`
//     })

//     console.log(users,leadUserIDarr)
// })
// .catch(err => {
//     console.log(err)
// })