const mongoose = require('mongoose')
const dbConfig = global.config.get('Dev.dbConfig.mongoDB');


mongoose.connect(dbConfig.mongoURL, { useNewUrlParser: true })
mongoose.set("useCreateIndex", true)

const customerSchema = new mongoose.Schema({
    companyName:{ type : String , unique : true, required : true}, 
    email: { type : String , unique : true, required : true},
    password: { type : String , sparse : true, required : true},
    expDate: Date,
    facebookID: String,
    googleID:String,
    lane : String

})

exports.Customer = new mongoose.model('Coustomer', customerSchema)

const facebookCustomerSchema = new mongoose.Schema({
    companyName:{ type : String , unique : true, required : true},
    email: { type : String , unique : true, required : true},
    facebookID: { type : String , unique : true, required : true},
    expDate: Date,
    lane : String
})

exports.FacebookCoustomer = new mongoose.model('FacebookCoustomer', facebookCustomerSchema)

const leadSchema = new mongoose.Schema({
    firstname: { type : String , sparse : true, required : true },
    lastname: { type : String , sparse : true, required : true},
    email:{ type : String , sparse : true, required : true},
    city: { type : String , sparse : true, required : true},
    title:{ type : String , sparse : true, required : true},
    msg: { type : String , sparse : true, required : true},
    cid: { type : String , sparse : true, required : true},
    userID: { type : Number , sparse : true, required : true},
    now_status: {type : String , sparse : true, required : true},
    date: {type : Date , sparse : true, required : true},

})


exports.Lead = new mongoose.model('Lead', leadSchema)

mongoose.Collection.dropIndexes


const leadProcessSchema = new mongoose.Schema({
    lead_id: { type : mongoose.Schema.Types.ObjectId , sparse : true, required : true , ref: 'Lead' },
    user_id: {type : Number , sparse : true, required : true} ,
    status: {type : String , sparse : true, required : true},
    last_date_modified: {type : Date , sparse : true, required : true},
    msg: {type : String , sparse : true, msg : true},

})


exports.LeadProcess = new mongoose.model('LeadProcess', leadProcessSchema)

const paymentSchema = new mongoose.Schema({
    user_id: {type : String , sparse : true, required : true , ref: 'Coustomer'} ,
    fullName: {type : String , sparse : true, required : true},
    cardNumber:{type : String , sparse : true, required : true},
    expDate:{type : Date , sparse : true, required : true},
    amount:{ type : String , sparse : true, required : true},
    coin: {type : String , sparse : true, required : true},
    date: {type : Date , sparse : true, required : true},
})


exports.Payment = new mongoose.model('Payment', paymentSchema)

exports.ObjectId = mongoose.Types.ObjectId


exports.ObjectId = mongoose.Types.ObjectId