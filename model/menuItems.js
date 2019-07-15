exports.selectMenuByRole = (role) => {

    switch(role){
        case 'super administrator': {
            return superAdmin
            break
        }
        case 'administrator': {
            return admin
            break
        }
        case 'worker': {
            return worker
            break
        }
        default:{
            break
        }
    }



}



const superAdmin = ['Dashboard','Leads','Users','Reports','Settings','Logout']
const admin = ['Dashboard','Leads','Reports','Settings','Logout']
const worker = ['Dashboard','Leads','Settings','Logout']