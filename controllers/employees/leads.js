
const Lead = require('../../models/Lead')
const LeadProcess = require('../../models/LeadProcess')
const User = require('../../models/User')
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


exports.postLeads = (req, res, next) => {
    
    console.log(req.body,"post")
    
    paging.pageIndex = parseInt(req.body.changepage)

    if (req.body.btnAdd === 'add') {
       
        mongoose.Lead.findByIdAndUpdate(mongoose.ObjectId(req.body.leadID), { now_status: req.body.status })
        .then(add => { 
            console.log(add)

            const leadProcess = new LeadProcess({
                status: req.body.status,
                userID : parseInt(req.body.userID),
                leadID: mongoose.ObjectId(req.body.leadID),
                msg: req.body.msg
            })
            
            leadProcess.save()
            res.redirect('/employees/dashboard/leads')
            
        
        
        })
        .catch(err => { console.log(err) } )


    }

    else {

        getDataFromDB(req,res,next)

    }


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
    console.log(paging.pageIndex * paging.itemPerPage , 'errr')
    
    let skip = paging.pageIndex * paging.itemPerPage
    if (typeof skip !== Number ) {
         skip = 0;
    }
    console.log(skip,"skip")

    mongoose.Lead.aggregate([

        {  $match: {userID: global.loginEmployee.userID}},
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
    .skip(skip)
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

    res.render('employees/dashboard',{
        user : global.loginEmployee,
        userMenu: menu,
        content: "Leads",
        leads: results,
        pageData : paging,
        leadStaus: Lead.leadStatus

      })
} 