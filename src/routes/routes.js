const express = require('express')
const router = express.Router()

// controllers
const AuthController = require('../controllers/auth.controller')
const FileController = require('../controllers/file.controller')

// middlewares
const verifyRefresh = require('../middlewares/verifyRefreshToken')
const verifyBearerToken = require('../middlewares/verifyBearerToken')

router 
    .post('/signup', AuthController.SIGN_UP)
    .post('/signin', AuthController.SIGN_IN)
    .post('/signin/new_token', verifyRefresh, AuthController.SIGN_IN_NEW_TOKEN)
    .post('/file/upload', verifyBearerToken, FileController.UPLOAD_FILE)
    .get('/file/list', verifyBearerToken, FileController.FILE_LIST)
    .delete('/file/delete/:id', verifyBearerToken, FileController.FILE_DELETE)
    .get('/file/:id', verifyBearerToken, FileController.FILE_BY_ID)
    .get('/file/download/:id', verifyBearerToken, FileController.FILE_DOWNLOAD)
    .put('/file/update/:id', verifyBearerToken, FileController.FILE_UPDATE)
    .get('/info', verifyBearerToken, AuthController.INFO)
    .get('/logout', verifyBearerToken, AuthController.LOGOUT)

module.exports = router