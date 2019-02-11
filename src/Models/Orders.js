const mongoose = require('mongoose');

//Define Schema
const OrdersSchema = new mongoose.Schema({
    id: Number,
    customerId: Number,
    total: Number,
    user: String,
    itens: [
        {
            productId: Number,
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