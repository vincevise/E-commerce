const { userModel } = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config("./config/.env");
const nodemailer = require('nodemailer')


const registerUser = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const isUser = await userModel.findOne({ email: email });
    if (isUser) {
      return res.status(400).json({ error: "User already exsist" });
    }
    const user = await userModel.create({
      username: username,
      email: email,
      password: password,
    });
    if (!user) {
      return res.status(400).json({ error: "Please fill all the details" });
    }
    const token = await jwt.sign({ UserID: user._id }, process.env.SECRET_KEY, {
      expiresIn: "2h",
    });

    res.cookie("login", token, { httpOnly: true });
    res.status(200).json({ username: username, token: token });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ error: error.message });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(400).json({ error: "Please fill all the details" });
    }
    const isUser = await userModel.findOne({ email: email });
    if (!isUser) {
      return res.status(400).json({ error: "User does not exists" });
    }
    const isValid = await bcrypt.compare(password, isUser.password);
    if (!isValid) return res.status(400).json({ error: "password invalid" });

    const token = await jwt.sign(
      { UserID: isUser._id },
      process.env.SECRET_KEY,
      { expiresIn: "2d" }
    );
    if (!token) {
      return res.status(400).json({ error: "Token error" });
    }
    res.status(200).json({
      token: token,
      username: isUser.username,
      email: email,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const loginAdmin = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(400).json({ error: "Please fill all the details" });
    }
    const isUser = await userModel.findOne({ email: email });
    if (!isUser) {
      return res.status(400).json({ error: "User does not exists" });
    }
    const isValid = await bcrypt.compare(password, isUser.password);
    if (!isValid) return res.status(400).json({ error: "password invalid" });

    const token = await jwt.sign(
      { UserID: isUser._id },
      process.env.SECRET_KEY,
      { expiresIn: "48h" }
    );
    if (!token) {
      return res.status(400).json({ error: "Token error" });
    }
    if (isUser.roles !== "admin") {
      return res.status(400).json({ error: "not allowed" });
    }
    res.status(200).json({
      token: token,
      username: isUser.username,
      email: email,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const authHelper = async (req, res, next) => {
  try {
    const token = req.headers.cookies;
    const { UserID } = jwt.verify(token, process.env.SECRET_KEY);
    if (!UserID) return res.status(400).json({ error: "Authentication error" });
    const { roles } = await userModel.findById(UserID);
    if (roles !== "admin") {
      return res.status(400).json({ error: "operation not allowed" });
    }
    next();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getAllUser = async (req, res) => {
  try {
    const allUser = await userModel.find();
    if (!allUser) {
      return res.status(400).json({ message: "server error" });
    }
    res.status(200).json({ data: allUser });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getUserUser = async(req,res)=>{
  try{
    const users = await userModel.find({roles:"user"})
    res.status(200).json({data:users})
    console.log(users)
  }catch(error){
    console.log(error.message)
  }
}

const getUserDetail = async (req, res) => {
  try {
    const { token } = req.body;
    const { UserID } = jwt.verify(token, process.env.SECRET_KEY);
    const user = await userModel.findById(UserID);
    res.status(200).json({
      data: {
        username: user.username,
        email: user.email,
        token: token,
      },
      message: "login successfully",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const forgotPassword = async(req,res) =>{
  const {email} = req.body
  // console.log(req.body)
  console.log(email)
  try{

    const user = await userModel.findOne({email:email})
    if(!user) res.status(400).json({error:"user not found"})
    console.log(user)

    const resetToken = user.createResetToken()
    const user1 = await userModel.findOneAndUpdate({email:email},{resetToken:resetToken})
    const link = `${req.protocol}://127.0.0.1:5173/resetpassword/${resetToken}`

    const transport = nodemailer.createTransport({
      service:"gmail",
      host:"smtp.gmail.com", 
      port:465,
      auth:{
        user:process.env.EMAIL,
        pass:process.env.EMAIL_PASSWORD
      }
    })

    const mailOptions = {
      from:process.env.EMAIL,
      to:email,
      subject:'Password Reset Request',
      text:`Go to this link ${link}`
    }
   

    transport.sendMail(mailOptions,(error,info)=>{
      if(error) return res.status(400).json(error)
      console.log(info)

      return res.status(200).json({message:"Email Sent"})
    })

    

  }catch(error){
    res.status(400).json({error:error.message})
  }
}

const resetpassword = async(req,res)=>{
  const {token} = req.params
  console.log(token)
  const {password,confirmpassword} = req.body
  try{  
    const user = await userModel.findOne({resetToken:token})
    if(!user) return res.status(400).json({error:"user does not exsist",data:user})

    if(!password || !confirmpassword) return res.status(400).json({error:"fill up all the field"})
    
    if(password !== confirmpassword) return res.status(400).json({error:"passwords do not match"})

    user.resetpasswordHandler(password)
    await user.save()

    res.status(200).json({message:"password changed successfully",data:user})
  }catch(error){
    res.status(400).json({error:error.message})
  }
}
 
module.exports = {
  registerUser,
  loginUser,
  getAllUser,
  authHelper,
  getUserDetail,
  loginAdmin,
  forgotPassword,
  resetpassword,
  getUserUser
};
