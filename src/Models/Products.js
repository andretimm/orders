const mongoose = require('mongoose');

//Define Schema
const ProductsSchema = new mongoose.Schema({
    id: Number,
    name: String,
    price: Number,
    multiple: Number,
    createdAt: {
        type: Date,
        default: Date.now
    },    
}, 
{ 
  versionKey: false
});

module.exports = mongoose.model('Products', ProductsSchema);