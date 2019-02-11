const Orders = require('../Models/Orders');

module.exports = {
    //Retorna clientes
    async getOrder(req, res) {
        const order = await Orders.find({}).sort('+createdAt');
        return res.status(200).json(order);
    },
    //Cria cliente
    //Utilizado apenas para dar carga inicial
    async setOrder(req, res) {
        const order = await Orders.create(req.body);
        return res.status(201).json(order);
    },
};