
const User = require('../../models/User')
const mysql = require('../../db/mysql')
const mongoose = require('../../db/mongoose')


const sortSelector = {
    selector: [ {orderBy:'firstName', view:'First Name'},{orderBy:'lastName', view:'Last Name'},{orderBy:'email', view:'Email'}],
    selected: 'firstName'
}

const paging = {
    next: false,
    prev: false,
    pageIndex: 0,
    itemPerPage: 10
}

exports.getLeads = (req, res, next) => {
    

    getDataFromDB(req,res,next)


}

const setPageData = (listOfUsers) => {
    console.log(1)
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
        console.log(2)
}

const getDataFromDB  = (req,res,next) => {
    mongoose.Lead.aggregate([

        {  $match: {userId: global.loginEmployee.userId}},
        {  $lookup: {
                from: "leadprocesses",
                localField: "_id",
                foreignField: "lead_id",
                as: "thisleadprocesses"
            }
        },
        { $match: {"thisleadprocesses": {$ne: []} } },
        { $sort: {"thisleadprocesses.last_date_modified": -1} },
    ])
    .skip(paging.pageIndex * 10)
    .limit(paging.itemPerPage + 1)
    .then(

        results =>  {
        console.log(results)

        setPageData(results)
        
        renderLeadsTable(req,res,next,results)

      }
    ).catch(err=> {console.log(err)})


}


const renderLeadsTable = (req,res,next,results) => {

    let menu

    if (global.loginEmployee === undefined) {
        menu = undefined
    } else {
        menu = User.selectMenuByRole(global.loginEmployee.role)
    }

    console.log(results)

    res.render('employees/dashboard',{
        user : global.loginEmployee,
        userMenu: menu,
        content: "Leads",
        leads: results,
        pageData : paging,

      })
} 