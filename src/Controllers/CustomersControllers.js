const Customers = require('../Models/Customers');

module.exports = {
    //Retorna clientes
    async getCustomer(req, res) {
        const customer = await Customers.find({}).sort('+createdAt');
        return res.status(200).json(customer);
    },
    //Cria cliente
    //Utilizado apenas para dar carga inicial
    async setCustomer(req, res) {
        const customer = await Customers.create(req.body);
        return res.status(201).json(customer);
    },
};