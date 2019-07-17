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
            
            let leadArray

            mongooseDB.LeadProcess.find({user_id: loginUser.userData.userID})
            .populate('lead_id').exec(function(err, projects){
                leadArray = projects

            })
            
            setTimeout(() => {
                console.log(leadArray)
                res.render('home',{user:global.loginUser , leads: leadArray})
            }, 1000);


            /*
            .then(result=>console.log(result))
            .catch(err=>{console.log(err)})
            */



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