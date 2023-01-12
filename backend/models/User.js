const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const crypto = require('crypto')

const UserSchema = new mongoose.Schema({
    username:{
        type:String,
        required:[true,'Please enter the username']
    },
    email:{
        type:String,
        required:[true, 'Please enter the email']
    },
    password:{
        type:String,
        required:[true, 'Please enter the password']
    },
    roles:{
        type:String,
        enum:['admin','user'],
        default:'user'
    },
    resetToken:{
        type:String
    },
    photo:{
        type:String
    }
})

UserSchema.pre('save',async function(){
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(this.password,salt)
    this.password = hashedPassword
})

UserSchema.methods.createResetToken = function(){
    // creating unique token using npm i crypto
    const resetToken = crypto.randomBytes(32).toString('hex')
    this.resetToken = resetToken
    return resetToken
}

UserSchema.methods.resetpasswordHandler = function(password){
    this.password = password
    this.resetToken = undefined
}

const userModel = mongoose.model("userModel",UserSchema)
module.exports = {userModel}