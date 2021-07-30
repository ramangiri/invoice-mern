const express = require('express')
const router = express.Router();
const details = require('../model/invoice');
const user = require('../model/users');
const authCheck = require('../routes/authenticationCheck');

// Data retrieval for Dashboard display

router.get('/statistics',authCheck, async (req,res)=>{
    try{
    let userCount = await user.countDocuments();
   
    let date = new Date().toString().slice(4,15);
    let invoiceDetails = await details.find({date});

    let totalinvoiceCount =  await details.countDocuments();
    let todayinvoiceCount = await details.find({date}).countDocuments();

    res.status(200).json({
        message : "Statistics",
        userCount ,
        totalinvoiceCount ,
        todayinvoiceCount ,
        invoiceDetails
    })
  } catch(error){
      res.status(500).json(error);
  }
})

module.exports = router;