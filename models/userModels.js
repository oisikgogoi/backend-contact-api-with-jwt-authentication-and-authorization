const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    username:{
        type:String,
        required:[true,'please enter the username']
    },
    email:{
        type:String,
        required:[true,'please enter the username'],
        unique:[true,'please enter an unique email']
    },
    password:{
        type:String,
        required:[true,'please enter the username']
    }
})

module.exports = mongoose.model('User',userSchema)