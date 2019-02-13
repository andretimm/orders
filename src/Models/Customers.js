const mongoose = require('mongoose');

//Define Schema
const CustomersSchema = new mongoose.Schema({
    id: Number,
    name: String,
    email: String,
    createdAt: {
        type: Date,
        default: Date.now
    },    
}, 
{ 
  versionKey: false
});

module.exports = mongoose.model('Customers', CustomersSchema);