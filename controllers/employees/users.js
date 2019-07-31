
const User = require('../../models/User')
const mysql = require('../../db/mysql')

const sortSelector = {
    selector: [ {orderBy:'firstName', view:'First Name'},{orderBy:'lastName', view:'Last Name'},{orderBy:'email', view:'Email'}],
    selected: 'firstName'
}

////// change to copy code from post and get!
const paging = {
    next: false,
    prev: false,
    pageIndex: 0,
    itemPerPage: 10
}

exports.getUsers = (req, res, next) => {

    renderTable(req,res,next)

}

exports.postUsers = (req, res, next) => {

    console.log(req.body.option)
    sortSelector.selected = req.body.option
    renderTable(req,res,next,parseInt(req.body.changepage),req.body.option)


}



setPageData = (listOfUsers) => {

    if (paging.pageIndex === 0) {
        paging.prev = false
    } else {
        paging.prev = true
    }

    if (listOfUsers.length > paging.itemPerPage) {
        paging.next = true
    } else {
        paging.next = false
    }
}



///test

exports.postUsersByParms = (req, res, next) => {

  


}


renderTable = (req,res,next, pageIndex = 0,order = "userID") => {

    console.log(order)
    paging.pageIndex = pageIndex
    console.log(paging.pageIndex)

    let menu

    if (global.loginEmployee === undefined) {
        menu = undefined
    } else {
        menu = User.selectMenuByRole(global.loginEmployee.role)
    }

console.log(`${mysql.findAllUsersExeptOne(global.loginEmployee.userID)}
${mysql.orderBy(order)}                  
${mysql.limitFromStartToEnd(paging.pageIndex * 10,paging.itemPerPage + 1)}
`)

    mysql.EnterQuery(`${mysql.findAllUsersExeptOne(global.loginEmployee.userID)}
                      ${mysql.orderBy(order)}                  
                      ${mysql.limitFromStartToEnd(paging.pageIndex * 10,paging.itemPerPage + 1)}
                      ` )
    .then(result => {

        console.log(req.params);
        
        const listOfUsers = result
        console.log('listofusers')
        //console.log(listOfUsers)


        setPageData(listOfUsers)

        res.render('employees/dashboard',{
            user : global.loginEmployee,
            userMenu: menu,
            content: "Users",
            users: listOfUsers,
            pageData : paging,
            select: sortSelector
          })



    })
    .catch(err => { console.log(err) })





}