const mongoose = require('mongoose')



mongoose.connect('mongodb://localhost:27017/bamy2DB', { useNewUrlParser: true })
mongoose.set("useCreateIndex", true)

const customerSchema = new mongoose.Schema({
    username:String, 
    cid: Number,
    email: String,
    password: String,
    facebookID: String,
    googleID:String,


})


exports.Customer = new mongoose.model('Coustomer', customerSchema)

const leadSchema = new mongoose.Schema({
    firstname: { type : String , sparse : true, required : true },
    lastname: { type : String , sparse : true, required : true},
    email:{ type : String , sparse : true, required : true},
    city: { type : String , sparse : true, required : true},
    title:{ type : String , sparse : true, required : true},
    msg: { type : String , sparse : true, required : true},
    cid: { type : Number , sparse : true, required : true},
    date: {type : Date , sparse : true, required : true},


})


exports.Lead = new mongoose.model('Lead', leadSchema)

mongoose.Collection.dropIndexes


const leadProcessSchema = new mongoose.Schema({
    lead_id: { type : String , sparse : true, required : true },
    user_id: {type : Number , sparse : true, required : true},
    now_status: {type : String , sparse : true, required : true},
    last_date_modified: {type : Date , sparse : true, required : true},

})


exports.LeadProcess = new mongoose.model('LeadProcess', leadProcessSchema)

