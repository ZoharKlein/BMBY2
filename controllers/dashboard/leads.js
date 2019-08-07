
const Payment = require('../../models/Payment')
const mongoose = require('../../db/mongoose')

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

    paging.pageIndex = parseInt(req.body.changepage)
    getDataFromDB(req,res,next)
}



getDataFromDB  = (req,res,next) => {
    mongoose.Lead.aggregate([

        {  $match: {cid: global.loginCustomer.id }},
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
    

const renderLeadsTable = (req,res,next,newleads) => {
        console.log(1)
        console.log('render',newleads)

        res.render('dashboard/dashboard',{
            title: "Leads",
            customer: global.loginCustomer,
            laneMenu: Payment.payLaneMenuForCustomer,
            content: 'My Leads',
            leads: newleads,
            pageData : paging,
    
            
    
          })


}