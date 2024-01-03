const jwt = require('jsonwebtoken')
const { refreshToken } = require('../controllers/auth.controller')


const verifyRefreshToken = (refreshToken)=>{
   return new Promise((resolve, reject)=>{
    jwt.verify(refreshToken,process.env.REFRESH_TOKEN_SECRET,(err,payload)=>{
        if(err){
            return reject(err)
        }
        const userId = payload.aud
        resolve(userId);
    })
   })

}

module.exports= {
    verifyRefreshToken
}