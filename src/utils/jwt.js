const jwt = require('jsonwebtoken')
const { authJWT } = require('../config')

const signBearerToken = (payload) => jwt.sign(payload, authJWT.secret_key_bearer, {
    expiresIn: authJWT.bearerTokenExp
})

const signRefreshToken = (payload) => jwt.sign(payload, authJWT.secret_key_refresh)

module.exports = {
    signBearerToken,
    signRefreshToken
}