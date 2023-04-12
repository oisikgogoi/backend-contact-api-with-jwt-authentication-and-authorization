//jshint esversion:6
const express = require('express')
const dotenv = require('dotenv').config()
const port = process.env.PORT || 5001
const mongoose = require('mongoose')
const errorHandler = require('./middlewares/errorHandler.js')

try{
    mongoose.connect('mongodb://localhost:27017/contactsDB')
}catch(err){
    console.log(err)
}

const app = express()

app.use(express.json())

app.use('/api/contacts',require('./Routes/contactRoutes'))
app.use('/api/auth',require('./Routes/userRoutes'))

app.use(errorHandler) 

app.listen(port,()=>{
    console.log(`server running on http://localhost:${port}`)
})

app.use((req,res,next)=>{
    return res.status(404).send('sorry, cant find that')
})