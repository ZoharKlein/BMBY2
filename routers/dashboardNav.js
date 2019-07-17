const express = require('express');
const router = express.Router();
const MenuItems = require('../model/menuItems').allMenuItems
const mongooseDB = require('../db/mongoose')


router.post('/:nav/', (req,res)=>{
    const nav = req.params.nav
    console.log(global.loginUser)


    switch (nav) {
        case MenuItems.dashboard :{
            res.send(req.params.nav+req.params.role+req.params.id)
            break;
        }
        case MenuItems.leads :{
            
            const leadArray = []

            mongooseDB.LeadProcess.find({user_id: global.loginUser.userData.userID})
            .populate('lead_id')
            .exec(function(err, projects){

                projects.forEach(element => {
                

                    const leadProcess = {
                        user_id: element.user_id,
                        now_status: element.now_status,
                        last_date_modified: element.last_date_modified
                    }

                    if(leadArray.length === 0) {
                        const leadProcessArr = []
                        leadProcessArr.push(leadProcess)

                        leadArray.push({lead: element.lead_id,leadProcess: leadProcessArr})

                    }
                    else {

                        let addToArray = false
                        for (i = 0; i < leadArray.length ; i++) {

                            if (leadArray[i].lead === element.lead_id) {

                                leadArray[i].leadProcess.push(leadProcess)
                                addToArray = true
                                break;
                            }

                        }
                        if (!addToArray) {
                            const leadProcessArr = []
                        
                            leadProcessArr.push(leadProcess)
                        
                            leadArray.push({lead: element.lead_id,leadProcess: leadProcessArr})
                        }
                        
                    }
                });

                
                leadArray.forEach(element => {

                    element.leadProcess.sort( (a,b) => {
                        console.log(a,b)
                        return new Date(b.last_date_modified) - new Date(a.last_date_modified)
                    })                    
                });


            })
            
            setTimeout(() => {
                console.log(leadArray)
                res.render('home',{user:global.loginUser , leads: leadArray})
            }, 1000);



            break;
        }
        case MenuItems.users :{
            res.send(req.params.nav+req.params.role+req.params.id)
            break;
        }
        case MenuItems.reports :{
            res.send(req.params.nav+req.params.role+req.params.id)
            break;
        }
        case MenuItems.settings :{
            res.send(req.params.nav+req.params.role+req.params.id)
            break;
        }
        ///neet to thinck were its belong
        case MenuItems.logout :{
            res.send(req.params.nav+req.params.role+req.params.id)
            break;
        }
        default: {
            break;
        }

    }







})









module.exports = router;