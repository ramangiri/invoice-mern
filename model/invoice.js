const mongoose = require('mongoose')

const invoiceSchema = new mongoose.Schema({
    invoiceno : {type: String, default: Date.getTime},
    products :[
	{
                quantity: Number,
                description: String,
                tax: Number,
                price: Number
    }
    ],
    client: {
        name : String,
        address: {
            door : String,
            city : String,
            state : String,
            zip : String
            }
    },
    email: String,
    date : {type: String, default: Date.now}
})

module.exports = mongoose.model('details',invoiceSchema)


