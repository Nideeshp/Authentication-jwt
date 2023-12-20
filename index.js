const express = require("express")
const errorhandler = require("./middleware/errorhandler")
const connectedDB = require("./config/dbconnection")
const app=express()
const dotenv=require("dotenv").config()
const port=process.env.PORT
app.use(express.json())



connectedDB()
app.use('/api/contacts',require('./routes/contactsroutes'))
app.use('/api/users',require('./routes/usersroutes'))
app.use(errorhandler)

app.listen(port,()=>console.log(`Server is running port ${port}`))

