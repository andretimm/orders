const Orders = require('../Models/Orders');

module.exports = {
    //Retorna pedidos
    async getOrder(req, res) {
        const order = await Orders.find({}).sort('+createdAt');
        return res.status(200).json(order);
    },
    //Cria pedidos
    async setOrder(req, res) {
        const order = await Orders.create(req.body);
        return res.status(201).json(order);
    },
};