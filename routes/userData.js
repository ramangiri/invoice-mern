const express = require('express')
const router = express.Router();
require('dotenv').config({ path: '.env' });
const users = require('../model/users');
const authCheck = require('../routes/authenticationCheck');

router.get('/userdata', authCheck, async (req,res)=>{
    try{
        let userData = await users.find();
        res.status(200).json({
        message: "User Data",
        userData
    })
    }
    catch(error){
        res.json({
            message:"User not found",
            error
        })
    }
})

router.post('/roleupdate',authCheck, async (req,res)=>{
    try {
        let {email,selectCheck} = req.body; 
        let data = users.findOne({email})
        if(data){
            await users.findOneAndUpdate({email},{ $set: {role:selectCheck}})
            res.status(200).json({
                message:"Role update successful"
            })   
        }
        else{
            res.json({
                message:"No data found"
            })
        }
    } catch (error) {
        res.json({
            error
        })
    }
})
module.exports=router
