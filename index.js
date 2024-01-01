const express = require("express")
const errorhandler = require("./middleware/errorhandler")
const connectedDB = require("./config/dbconnection")
const app=express()
const dotenv=require("dotenv").config()
const port=process.env.PORT
const morgan = require('morgan')
const createError= require('http-errors')
app.use(express.json())
app.use(express.urlencoded({extended:true}))
const authroute = require('./routes/auth.Route')



connectedDB()
app.use(morgan('dev'))

// app.use('/api/contacts',require('./routes/contactsroutes'))
// app.use('/',require('./routes/usersroutes'))
app.use('/',authroute)
app.use(errorhandler)

app.listen(port,()=>console.log(`Server is running port ${port}`))

