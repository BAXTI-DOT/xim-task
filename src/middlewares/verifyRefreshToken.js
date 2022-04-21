const { 
    verify, 
    JsonWebTokenError 
} = require('jsonwebtoken')
const { authJWT: { secret_key_refresh } } = require('../config')

module.exports = (req, res, next) => {
    const { refreshToken } = req.body

    if(!refreshToken) {
        return res.status(400).json({
            message: "Provide refresh token !!"
        })
    }
    
    verify(refreshToken, secret_key_refresh, (err, decode) => {
        if(err instanceof JsonWebTokenError) {
            return res.status(401).json({
                message: "Invalid token, provide valid one !!"
            })
        }
        
        req.userId = decode.id
        next()
    })
}