const mongoose = require('mongoose')

const ContactSchema = mongoose.Schema({
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    name:String,
    email:String,
    phone:Number
})

module.exports =  new mongoose.model('Contact',ContactSchema)
