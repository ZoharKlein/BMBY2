
const User = require('../../models/User')
const mysql = require('../../db/mysql')

const sortSelector = {
    selector: [ 
        {orderBy:'firstName', view:'First Name'},
        {orderBy:'lastName', view:'Last Name'},
        {orderBy:'email', view:'Email'}
    ],
    selected: 'firstName'
}

const groupSelector = {
    selector: [
        {groupBy: "all", view: "All"},
        {groupBy: User.userStats.APPROVED, view: User.userStats.APPROVED},
        {groupBy: User.userStats.SUSPENDED, view: User.userStats.SUSPENDED},
        {groupBy: User.userStats.WAIT_FOR_HACK, view: User.userStats.WAIT_FOR_HACK}
    ],
    selected: 'all'
}

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

    const userID = req.body.userID
    const status = req.body.statusUpdateOption
    const role = req.body.roleUpdateOption


    console.log(req.body)

    if (req.body.btnEdit === "edit") {
        

        mysql.EnterQuery(mysql.updateRoleAnStausByID(role,status,userID))
        .then(result => {
            renderTable(req,res,next)
        })
        .catch(err => { console.log(err) })     
    }
    else if (req.body.btnEdit === 'delete') {

        mysql.EnterQuery(mysql.deleteUserByID(userID))
        .then(result => {
            renderTable(req,res,next)
        })
        .catch(err => { console.log(err) })    
    }
    else {

        let pagenumber 
        if (req.body.order === "order") {
            pagenumber = 0
        } else {
            pagenumber = parseInt(req.body.changepage)
        }
        
        renderTable(req,res,next,pagenumber,req.body.option,req.body.group)
        
    }




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

renderTable = (req,res,next, pageIndex = 0,order = "userID",group="all") => {

  //  console.log(order)
    paging.pageIndex = pageIndex
//    console.log(paging.pageIndex)

    let menu
    let sqlCommand

    if (req.session.loginUser === undefined) {
        menu = undefined
    } else {
        menu = User.selectMenuByRole(req.session.loginUser.role)
    }
    

    let roles = ""
    
    for (role in User.userRole ) {

        if (User.userRole[role] === req.session.loginUser.role) {
            roles += `"  "`
            break
        }
        else {
            roles += `"${role}",`
        }

    }

    if (group === 'all')
    {
        sqlCommand = `${mysql.findAllUsersExeptOne(req.session.loginUser.userID,roles)}
                      ${mysql.orderBy(order)}                 
                      ${mysql.limitFromStartToEnd(paging.pageIndex * 10,paging.itemPerPage + 1)}
                      `

    } 

    else {

        sqlCommand =`${mysql.findAllUsersExeptOneByStatus(req.session.loginUser.userID,group)}
        ${mysql.orderBy(order)}                  
        ${mysql.limitFromStartToEnd(paging.pageIndex * 10,paging.itemPerPage + 1)}
        `

    }

    mysql.EnterQuery(sqlCommand)
    .then(result => {

        //console.log(req.params);
        
        const listOfUsers = result
        console.log('listofusers')
        //console.log(listOfUsers)

        sortSelector.selected = order
        groupSelector.selected = group


        setPageData(listOfUsers)

        res.render('employees/dashboard',{
            user : req.session.loginUser,
            userMenu: menu,
            content: "Users",
            users: listOfUsers,
            pageData : paging,
            select: sortSelector,
            group: groupSelector,
            userRoles: User.userRole,
            userStats: User.userStats
          })



    })
    .catch(err => { console.log(err) })





}

