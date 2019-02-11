const mongoose = require('mongoose');

//Define Schema
const OrdersSchema = new mongoose.Schema({
    id: Number,
    customerId: Number,
    customerName: String,
    total: Number,
    user: String,
    itens: [
        {
            productId: Number,
            productName: String,
            price: Number,
            qtd: Number,
            status: String,
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now
    },
},
    {
        versionKey: false
    });

module.exports = mongoose.model('Orders', OrdersSchema);