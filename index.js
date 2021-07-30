
const express = require('express')
const connectDB = require('./config/db')
const cors = require('cors')
require("dotenv").config();
const app = express()

// Connect to Database
connectDB();

app.use(express.json({extended:false}));
 
app.use(cors())

// Define Routes

app.use('/access',require('./routes/login'));
app.use('/view',require('./routes/invoicedetails'))
app.use('/getdata',require('./routes/dashboardData'))
app.use('/getuser',require('./routes/userData'))


const PORT = process.env.PORT || 5000;




app.listen(PORT,()=>{console.log(`Server running on port ${PORT}`)})        