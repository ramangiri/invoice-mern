
const express = require('express')
const router = express.Router();
const user = require('../model/users');
require('dotenv').config({ path: '.env' })
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const key = process.env.SESSION_JWT_KEY;
const fkey = process.env.FORGOT_JWT_KEY;
const nodemailer = require('nodemailer');


//User Login
router.post('/login', async (req,res)=>{
    try{
        let {email,password} = req.body;  
         let User = await user.findOne({email});
        if(User){
            let isValid = await bcrypt.compare(password,User.password)
            if(isValid){
                let token = jwt.sign({fullName : User.fullName, role : User.role }, key, { expiresIn: '20m' });
                res.cookie('token', token, { httpOnly: true })
                res.status(200).json({
                    message: "Login Successful",
                    data : {role : User.role, name : User.fullName},
                    token
                })
            }else{
                res.status(200).json({
                    message:"Invalid Credentials"
                })
            }
        }else{
            res.status(404).json({
                message:"No user found"
            })
        }
    }
    catch(error){
       return res.status(500).json({
            message: error
        })
    }
})

// User Registration
router.post('/register', async (req,res)=>{
   
    try{
    let {fullName,email,password,role} = req.body;  
    let User = await user.findOne({email});
    if(User){
        res.json({
            message:"User Already exists"
        })
    }else{
        const securePassword = await bcrypt.hash(password, 10)
        password = securePassword
        User = new user({
            fullName,
            email,
            password,
            date: new Date(),
            role
        });

        User.save();
        res.json({
            message : "User Created"})
    }
    }
    catch(error){
        res.status(500).json({
            message:error
        })
    }
})

// Forgot Password request to Email
router.post('/forgotpassword', async (req,res)=>{
   try{ 
       let {email} = req.body; 
       let data = user.findOne({email})
       
       if(data){
       let forgottoken = jwt.sign({data: email }, fkey, { expiresIn: '20m' });
       await user.findOneAndUpdate({email},{ $set: { forgottoken}})
       var transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
          user: process.env.EMAIL,
          pass: process.env.PASS
        },
        tls: {
            rejectUnauthorized: false
          }
      });
      
      let mailOptions = {
        from: `RG Reset password link <ramangiri93@gmail.com>`,
        to: email,
        subject: 'Password Reset Link',
        html: `<div style="margin : 0 auto; width: 450px; border:1px solid lightgray; border-radius:5px; padding:1rem; text-align:center;">
        <h1 style="font-size:1rem; color:#2BAE66FF; text-align: left;"> <lead>Dear user,</lead> <br/> <br/>Please click the below button to reset your password.</h1>
        <div style="padding:1rem; margin:0.75rem auto; width:400px; height: 300px;">
        
           <a href="${process.env.CLIENT_SERVER}/resetpassword/${forgottoken}"></a>
          <img src="https://thumbs.dreamstime.com/b/forgot-password-lock-keyboard-combination-gray-computer-158933051.jpg" style="width:100%; height:100%; text-decoration:none; cursor: pointer;" alt="Reset-password">
        </a>
          </div>
        <a href="${process.env.CLIENT_SERVER}/resetpassword/${forgottoken}"  style="font-size: 1rem; padding:0.75rem; border:none; border-radius:5px; text-decoration:none; background-color: rgb(76, 175, 75); color: whitesmoke; cursor:pointer;">Reset Now</a>
        </div>
        `
        
        
        
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
                return res.status(200).json({
                message:'Email sent to: ' + email
            }) 
          
        }
      });
     }else{
        return res.status(200).json({
             message:"User not found"
         })
     }
     
    }
    catch(error){
        res.status(404).json({
            message:error
        })
    }
})

router.post('/resetpassword', async (req,res)=>{
    try{
       
        const {forgottoken,newPassword} = req.body
       
        if(forgottoken){
            jwt.verify(forgottoken,fkey,async function(error,decoded){
                if(error){
                    return res.status(400).json({message:"Incorrect or expired link"})
                }
                let email = decoded.data   
                const password = await bcrypt.hash(newPassword, 10)  
                await user.findOneAndUpdate({email},{ $set: { password, forgottoken:''}})
                res.status(200).json({
                    message:"Password Reset successfully"
                })
         })
        } 
    }
    catch(error){
        res.status(400).json({
            message:error
        })
    }
})

module.exports = router
