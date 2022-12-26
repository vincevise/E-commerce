const { registerUser, loginUser, getAllUser, authHelper, getUserDetail, loginAdmin, getAdminDetail, forgotPassword, resetpassword, getUserUser } = require('../controller/authController')
const { logout } = require('../controller/userController')

const userRouter = require('express').Router()

userRouter.post('/register',registerUser)
userRouter.post('/login',loginUser)
userRouter.post('/login-admin',loginAdmin)
userRouter.get('/getAllUser',authHelper,getAllUser)
userRouter.get('/getUserUser',getUserUser)
userRouter.post('/getUserDetails',getUserDetail)
userRouter.get('/logout',logout)
userRouter.post('/forget-password',forgotPassword)
userRouter.post('/reset-password/:token',resetpassword)


module.exports = {userRouter}