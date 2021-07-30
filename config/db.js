const mongoose = require('mongoose')
require('dotenv').config()
const db = process.env.DATABASE_ACCESS
const connectDB = async () =>{
    try {
        await mongoose.connect(db,{
            useNewUrlParser:true,
            useFindAndModify: false,
            useUnifiedTopology: true
        })
        console.log("MongoDB connected")
    } catch (error) {
        console.log(error)
    }
}

module.exports = connectDB;
