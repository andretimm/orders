const Orders = require('../Models/Orders');

module.exports = {
    //Retorna pedidos
    async getOrder(req, res) {
        const order = await Orders.find({}).sort('+createdAt');
        return res.status(200).json(order);
    },
     //Retorna ultimo id
     async getOrderId(req, res) {
        const order = await Orders.findOne({}, ['id']).sort({'id' : -1});
        return res.status(200).json(order);
    },
    //Cria pedidos
    async setOrder(req, res) {
        const order = await Orders.create(req.body);

        //Dispara evento enviando novo pedido criado
        req.io.emit('newOrder', order);

        return res.status(201).json(order);
    },
};