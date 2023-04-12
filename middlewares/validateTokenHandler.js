const jwt = require('jsonwebtoken')

const ValidateToken = (req,res,next)=>{
    const token = req.headers.Authentication || req.headers.authentication
    if(token && token.startsWith('Bearer')){
        const accessToken = token.split(' ')[1]

        jwt.verify(accessToken,process.env.SECRET,(err,decoded)=>{
                if(err){
                   res.status(403).json('unauthorized, invalid json web token')
                   console.log('hpp')
                }
            req.user = decoded.user
        })
    }
    else{
        try{
            throw new Error('unauthorized, u havet passed an access token ot it wrong')
        }catch(error){
            return res.status(403).json('unauthorized')
        }
    }
    next()
}

module.exports = ValidateToken