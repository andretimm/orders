const mongoose = require('mongoose');

const OrdersSchema = new mongoose.Schema({
    id: Number,
    customerId: Number,
    customerName: String,
    total: String,
    user: String,
    itens: [
        {
            id: Number,
            productId: Number,
            productName: String,
            price: String,
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