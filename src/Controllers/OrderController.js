const Orders = require('../Models/Orders');

module.exports = {
    //Retorna pedidos
    async getOrder(req, res) {
        const order = await Orders.find({}).sort('+createdAt');
        return res.status(200).json(order);
    },
    //Retorna ultimo id
    async getOrderId(req, res) {
        const order = await Orders.findOne({}, ['id']).sort({ 'id': -1 });
        return res.status(200).json(order);
    },
    //Retorna ultimo id
    async getProductId(req, res) {
        let order = await Orders.findOne({ id: req.params.id }, ['itens.id']).sort({ 'id': -1 });
        order = order.itens.reduce((prev, current) => (prev.id > current.id) ? prev : current);
        return res.status(200).json(order);
    },
    //Cria pedidos
    async setOrder(req, res) {
        const { id } = req.body;
        let retorno = '';
        const order = await Orders.findOne({ id });
        if (order) {
            //Atualiza pedido
            order.set(req.body);
            retorno = await order.save();
            //Dispara evento enviando o pedido atualizado
            req.io.emit('updateOrder', retorno);
        } else {
            //Crianovo pedido
            const newOrder = await Orders.create(req.body);
            //Dispara evento enviando novo pedido criado
            req.io.emit('newOrder', newOrder);
            retorno = newOrder;
        }
        return res.status(201).json(retorno);
    },
};