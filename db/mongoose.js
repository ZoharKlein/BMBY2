const mongoose = require('mongoose')
const passportLocalMongoose = require('passport-local-mongoose')


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

customerSchema.plugin(passportLocalMongoose)

exports.Customer = new mongoose.model('Coustomer', customerSchema)

const leadSchema = new mongoose.Schema({
    firstname: String,
    lastname: String,
    email:String,
    city: String,
    title:String,
    msg: String,


})

leadSchema.plugin(passportLocalMongoose)

exports.Lead = new mongoose.model('Lead', leadSchema)
