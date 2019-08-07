const mongooseDB = require('../db/mongoose')

module.exports = class LeadProcess {
    constructor(...parms) {
        const data = parms[0]
        console.log(data)

        this.leadProcess = mongooseDB.LeadProcess({
            lead_id: data.leadID,
            user_id: data.userID, 
            status: data.status,
            last_date_modified: new Date(),
        })
    }

    save() {
        this.leadProcess.save()
        .then(result => { console.log(result, ' add to db')} )
        .catch(err => { console.log(err) })
    }
}