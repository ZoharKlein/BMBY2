const mongooseDB = require('../db/mongoose')
const mysql = require('../db/mysql')
const LeadProcess = require('./LeadProcess')

module.exports = class Lead {
    constructor(...parms) {
        const data = parms[0]
        console.log(data)


            this.lead = mongooseDB.Lead({
                firstname: data.firstname,
                lastname: data.lastname,
                email: data.email,
                mobile: data.mobile,
                city: data.city,
                cid: data.cid,
                msg: data.msg,
                title: data.title,
                userID: data.userID,
                now_status: leadStatus.new,
                date: new Date()
            
            })
        



    }

    save() {
        this.lead.save()
        .then(result => { 
                const leadProcess = new LeadProcess({status: leadStatus.new, userID : result.userID, leadID: result._id, msg:"New lead enterd"})
                leadProcess.save()
                this.lead
              
            })
        .catch(saveErr => { console.log( saveErr )})
    }
}

const leadStatus = {
    new:'New lead',
    finsh: 'Finsh the lead process',
    waitForAdmin: 'Waiting for admin check',
    waitForClientAnswer: 'Wait to hear from the client'
}

module.exports.leadStatus = leadStatus