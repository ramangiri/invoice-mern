const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    fullName: String,
    email: String,
    password: String,
    role:String,
    date : {type: String, default: Date.now},
    forgottoken: String
})

module.exports = mongoose.model('user',userSchema)


