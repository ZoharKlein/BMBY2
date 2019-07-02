const express = require('express')
const bodyParser = require('body-parser')
const ejs = require('ejs')
const cors = require('cors')
const PORT = process.env.PORT || 3000

const app = express()

app.use(cors)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(express.static("public"))

app.set("view engine", "ejs")

app.get('/', (req, res) => {
    res.render("home")

})


app.listen(PORT, () => console.log(PORT + " running"))