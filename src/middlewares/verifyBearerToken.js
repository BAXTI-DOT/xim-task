const { 
    verify, 
    TokenExpiredError, 
    JsonWebTokenError 
} = require('jsonwebtoken')
const { authJWT: { secret_key_bearer } } = require('../config')
const authModel = require('../models/auth.model')

module.exports = (req, res, next) => {
    const { bearertoken } = req.headers

    if(!bearertoken) {
        return res.status(400).json({
            message: "Provide bearer token !!"
        })
    }
    
    verify(bearertoken, secret_key_bearer, async(err, decode) => {
        if(err instanceof TokenExpiredError) {
            return res.status(401).json({
                message: "Bearer token expired !!"
            })
        }

        if(err instanceof JsonWebTokenError) {
            return res.status(401).json({
                message: "Invalid token, provide valid one !!"
            })
        }

        const user = await authModel.userById(decode?.id)

        if(!user) {
            return res.status(401).json({
                message: "Invalid id on payload"
            })
        }

        req.email = user.user_email
        req.id = user.user_id
        
        next()
    })
}