const Lead = require('../../models/Lead')
const LeadProcess = require('../../models/LeadProcess')
const User = require('../../models/User')
const mongoose = require('../../db/mongoose')


const sortSelector = {
    selector: [ 
        {orderBy:'firstName', view:'First Name'},
        {orderBy:'lastName', view:'Last Name'},
        {orderBy:'email', view:'Email'},
        {orderBy:'date', view:'Date'}    
    ],
    selected: 'firstName'
}

const groupSelector = {
    selector: [ 
        {groupBy: Lead.leadStatus.new, view:Lead.leadStatus.new},
        {groupBy: Lead.leadStatus.waitForAdmin, view:Lead.leadStatus.waitForAdmin},
        {groupBy: Lead.leadStatus.waitForClientAnswer , view:Lead.leadStatus.waitForClientAnswer},
        {groupBy: Lead.leadStatus.finsh, view:Lead.leadStatus.finsh}],
    selected: 'firstName'
}

const paging = {
    next: false,
    prev: false,
    pageIndex: 0,
    itemPerPage: 10
}

exports.getCustomers = (req, res, next) => {

    if (req.session.loginUser.lastPasswordUpdate >= new Date() ) {
        res.redirect('/employees/dashboard/settings')
    }
    else {

        getDataFromDB(req,res,next)
    }
    



}


exports.postLeads = (req, res, next) => {
    
    
    console.log(req.body,"post")


    if (req.body.changepage === undefined) {
        paging.pageIndex = 0

    }
    else {
        paging.pageIndex = parseInt(req.body.changepage)

    }
    console.log(paging)
    

    if (req.body.btnAdd === 'add') {
       
        mongoose.Lead.findByIdAndUpdate(mongoose.ObjectId(req.body.leadID), { now_status: req.body.status })
        .then(add => { 
           // console.log(add)

            const leadProcess = new LeadProcess({
                status: req.body.status,
                userID : parseInt(req.body.userID),
                leadID: mongoose.ObjectId(req.body.leadID),
                msg: req.body.msg
            })
            
            leadProcess.save()
            
            getDataFromDB(req,res,next,parseInt(req.body.changepage))

            
        
        
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


    mongoose.Customer.find(
    )
    .skip(paging.pageIndex * paging.itemPerPage)
    .limit(paging.itemPerPage + 1)
    .then(

        results =>  {
        console.log(results)

        setPageData(results)
        
        renderCustomersTable(req,res,next,results)

      }
    ).catch(err=> {console.log(err)})


}


const renderCustomersTable = (req,res,next,results) => {

    let menu

    if (req.session.loginUser === undefined) {
        menu = undefined
    } else {
        menu = User.selectMenuByRole(req.session.loginUser.role)
    }
    res.render('employees/dashboard',{
        user : req.session.loginUser,
        userMenu: menu,
        content: "Customers",
        leads: results,
        pageData : paging,
        leadStaus: Lead.leadStatus

      })
} 