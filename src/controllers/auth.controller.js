const authModel = require('../models/auth.model.js')
const { signBearerToken, signRefreshToken } = require('../utils/jwt')

module.exports = {
    SIGN_UP: async(req, res) => {
        try {
            const { email, password } = req.body

            if(!email || !password) {
                return res.status(400).json({
                    message: "Enter valid credentials"
                })
            }

            const existingUser = await authModel.checkExisting(email, password)

            if(existingUser) {
                return res.status(400).json({
                    message: "User with these credentials already exists"
                })
            }

            const newUser = await authModel.signUp(email, password)

            if(newUser) {
                res.status(201).json({
                    message: "User registered succesfully !!",
                    bearerToken: signBearerToken({
                        id: newUser.user_id,
                        email: newUser.user_email,
                        isValid: true
                    }),
                    refreshToken: signRefreshToken({
                        id: newUser.user_id,
                        isValid: true
                    })
                })
            }
        } catch(err) {
            console.log(err)
            res.sendStatus(500)
        }
    },
    SIGN_IN: async(req, res) => {
        try {
            const { email, password } = req.body

            if(!email || !password) {
                return res.status(400).json({
                    message: "Enter valid credentials"
                })
            }

            const user = await authModel.signIn(email, password)

            if(!user) {
                return res.status(401).json({
                    message: "User with these credentials is not found !!"
                })
            }

            res.status(200).json({
                message: "Authorized",
                bearerToken: signBearerToken({
                    id: user.user_id,
                    email: user.user_email,
                    isValid: true
                }),
                refreshToken: signRefreshToken({
                    id: user.user_id,
                    isValid: true
                })
            })
        } catch(err) {
            console.log(err)
            res.sendStatus(500)
        }
    },
    SIGN_IN_NEW_TOKEN: async(req, res) => {
        try {
            const { userId } = req
            const user = await authModel.userById(userId)

            if(!user) {
                return res.status(401).json({
                    message: "User not found"
                })
            }

            res.status(200).json({
                message: "Bearer token has been updated",
                bearerToken: signBearerToken({
                    id: user.user_id,
                    email: user.user_email,
                    isValid: true
                })
            })
        } catch(err) {
            console.log(err)
            res.sendStatus(500)
        }
    },
    INFO: async(req, res) => {
        try {
            const { email, id } = req

            res.status(200).json({
                id,
                email
            })
        } catch(err) {
            console.log(err)
            res.sendStatus(500)
        }
    },
    LOGOUT: async(_, res) => {
        try {
            res.status(200).send({
                message: "You are logged out"
            })
        } catch(err) {
            console.log(err)
            res.sendStatus(500)
        }
    }
}