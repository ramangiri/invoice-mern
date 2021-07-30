const express = require('express')
const router = express.Router();
const details = require('../model/invoice');
require('dotenv').config({ path: '.env' });
const nodemailer = require('nodemailer');
const users = require('../model/users');
const invoice = require('../model/invoice');
const authCheck = require('../routes/authenticationCheck');

// creating new invoice
router.post('/createinvoice',authCheck,async (req,res)=>{
    try {
        const {products,client,email} = req.body
        const usertype = await users.find({$or:[
            {"role":{"$in":["Manager","Admin"]}},
        ]},'email')
        let userEmail = ''
        usertype.forEach((obj)=>{
            userEmail += obj.email +','
        }) 
        emailAddress = userEmail.slice(0, -1);

        Details = new details({
            invoiceno: 'INV' + new Date().getTime().toString().slice(5,13),
            products,
            client,
            email,
            date:new Date().toString().slice(4,15)
        });

        Details.save();
          
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
            from: process.env.EMAIL,
            to: email,
            cc: emailAddress,
            subject: 'Invoice Generated',
            html: `<h1>Invoice Generated</h1><p>Your Invoice has been successfully generated. Your invoice number is ${Details.invoiceno} Visit our website to download your invoice</p>`
          };
          
          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
                    return res.status(200).json({
                    message:'Email sent to: ' + email
                }) 
              
            }
          })
            res.json({
            message : "Invoice Created", data : Details.invoiceno})
        
    } catch (error) {
        res.status(500).json({
            message:error
        })
    }
})

//get all invoices
router.get('/getallinvoice',authCheck,async (req,res)=>{
    try {
        data = await details.find();
        if(data){     
            return res.status(200).json({
                message : "All Data",
                data
            })
        }else{
            return res.status(200).json({
                message : "No data in database"})
        } 
    } catch (error) {
        res.status(500).json({
            message:error
        })
    }
})

//get invoice by id
router.get('/getinvoicebyid',authCheck,async (req,res)=>{
    try {
        const {invoiceno} = req.body
        data = await details.findOne({invoiceno});
        if(data){
            return res.status(200).json({
                message : "Invoice Found",
                data
            })
        }else{
            return res.status(200).json({
                message : "No such invoice in database"})
        } 
    } catch (error) {
        res.status(500).json({
            message:error
        })
    }
})

//update existing invoice 
router.post('/updateinvoice',authCheck,async (req,res)=>{
    try {
        const {invoiceno,products,client,email} = req.body
        const date = new Date().toString().slice(4,15);
        data = await details.findOne({invoiceno});
        if(data){
            await details.findOneAndUpdate({invoiceno},{ $set: {products,client,email,date}})
            res.status(200).json({
                message : "Invoice Updated"})
        }else{
            return res.status(200).json({
                message : "No such invoice in database"})
        } 
       
    } catch (error) {
        res.status(500).json({
            message:error
        })
    }
})

//search for invoice by invoice id and client name
router.post('/getinvoicebysearch',authCheck,async (req,res)=>{
    try {
        const {searchData} = req.body;
        data = await details.find({
            '$or': [
              {
                'invoiceno': {
                  '$regex': `.*${searchData}.*`
                }
              }, {
                'client.name': {
                  '$regex': `.*${searchData}.*`
                }
              }
            ]
          });
         
        if(data){
            return res.status(200).json({
                message : "Invoice Found",
                data
            })
        }else{
            return res.status(200).json({
                message : "No such invoice in database"})
        } 
       
    } catch (error) {
        res.status(500).json({
            message:error
        })
        
    }
});

//delete existing invoice 
router.post('/deleteinvoice',authCheck,async (req,res)=>{
    try {
        const {invoiceno} = req.body
        data = await details.findOne({invoiceno});
        if(data){
            await details.findOneAndRemove({invoiceno})
            res.status(200).json({
                message : "Invoice Deleted"})
        }else{
            return res.status(200).json({
                message : "No such invoice in database"})
        } 
       
    } catch (error) {
        res.status(500).json({
            message:error
        })
    }
})


module.exports = router