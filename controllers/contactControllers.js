const Contact = require("../models/contactModels")

//@desc get all contacts
//@route GET /api/contact/
//@access private
const getContacts = async (req,res)=>{
    try{
        const contacts = await Contact.find({user_id:req.user.id})
        res.status(200).json({contacts})
    }catch(err){
        return  res.status(404).json('couldnt find any contacts, possible reasons: accessToken not authorized')
    }
}


//@desc create new contact
//@route POST /api/contact/
//@access private
const createContact = async (req,res)=>{
    const {name,email,phone} = req.body

    try{
        if(!name || !email || !phone) {
            res.status(400)
            throw new Error('all fields are mandatory')       
        }
    }catch(err){
       return  res.status(401).json('all fields are mandatory')
    }

  
    if(!req.user){
        try{
            throw new Error('unauthorized')
        }catch(error){
            return res.status(403).json('unauthorised')
        }
    } 
   
    

    try{
        const newContact = await Contact.create({
            name,
            email,
            phone,
            user_id : req.user.id
        })
    }
    catch(err){
        return res.status(400).json('something went wrong')
    }
    res.status(200).json({message:'successfully created a contact'})
}

//@desc get one contacts
//@route GET /api/contact/:id
//@access public
const getContact = async (req,res)=>{
    if(!req.user){
        try{
            throw new Error('unauthorized')
        }
        catch(err){
           return  res.status(403).json('unauthorized')
        }
    }
    try{
        const contact = await Contact.findById(req.params.id)
        if(contact) res.status(200).json(contact)
        else throw new Error('cant find any such contact')
    }
    catch(err){
        return res.status(401).json({message:'cant find any such contact'})
    }
}

//@desc update a contact
//@route GET /api/contact/:id
//@access public
const updateContact = async (req,res)=>{
    if(!req.user){
        try{
            throw new Error('unauthorized')
        }
        catch(err){
           return  res.status(403).json('unauthorized')
        }
    }
    try{
        const contactId = req.params.id
        const updatedContact = await Contact.findByIdAndUpdate(contactId,req.body,{new:true})
        res.status(200).json({message:`contact info updated for ${req.params.id}`})
    }
    catch(err){
            res.status(401).json({message:'cant find any such contact'})
    }
}


//@desc delete a contact
//@route GET /api/contact/:id
//@access public
const deleteContact = async (req,res)=>{
    if(!req.user){
        try{
            throw new Error('unauthorized')
        }
        catch(err){
           return  res.status(403).json('unauthorized')
        }
    }
    try{
        const contactId = req.params.id
        await Contact.findByIdAndDelete(contactId)
        res.status(200).json({message:`contact info deleted for ${req.params.id}`})
    }
    catch(err){
            res.status(401).json({message:'cant find any such contact'})
    }
}

module.exports = {deleteContact,updateContact,createContact,getContact,getContacts}