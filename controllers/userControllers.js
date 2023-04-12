const User = require('../models/userModels.js')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


//@desc register or sign up
//@route POST /api/auth/register
//@access public
const register = async (req,res)=>{
    const {username,email,password} = req.body

    //check if all the fields are present
    try{
        if(!username || !email || !password){
            res.status(401)
            throw new Error('All fields are manditory')
        }
    }catch(error){
        return res.status(401).json('all fields are manditory')
    }


    //check for user availibility
    const userAvailable = await User.findOne({email:email})

    try{
        if(userAvailable){
          throw new Error('email already taken')
       }
    }catch(error){
        return res.status(400).json({message:'email already taken'})
    }
    
    //hash password
    const hashedPass = await bcrypt.hash(password,10).catch(err=> console.log('error while hashing the password'))

    
    // make new mongoDB document 
    try{ 
        const user = await User.create({
                username,
                email,
                password:hashedPass
            })

        console.log(user)
        res.status(201).json({message:'succesfully created an account'})

    }catch(err){
            res.status(400).json({message:'something went wrong, user not created'})
    }
 }

 
//@desc Login
//@route POST /api/auth/login
//@access public
const login = async (req,res)=>{
   const {email,password} = req.body
   
   try{
    if(!email || !password){
        res.status(401)
        throw new Error('all fields are mandatory')
    }
   }catch(err){
        return res.status(401).json('all fields are manditory')
   }

     const user = await User.findOne({email:email}).catch(err=> res.status(404).json('enter a valid email'))

        try{
            if(user && (await bcrypt.compare(password, user.password))){
                const accessToken = jwt.sign({
                    user:{
                        username : user.username,
                        email : user.email,
                        id: user.id
                    }
                },process.env.SECRET,{expiresIn:'5m'})

                res.status(200).json({accesstoken:accessToken})
            }
            else{
                     throw new Error('wrong password')
            }
            }catch(err){
                return res.status(401).json('wrong password')  
            }

       
 


}


//@desc checkout
//@route POST /api/auth/checkout
//@access private
const currentUser = async (req,res)=>{
   return res.json(req.user)
}

module.exports= {login,currentUser,register}



