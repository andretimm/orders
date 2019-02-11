const Products = require('../Models/Products');

module.exports = {
    //Retorna produtos
    async getProduct(req, res) {
        const product = await Products.find({}).sort('+createdAt');
        return res.status(200).json(product);
    },
    //Cria produto
    //Utilizado apenas para dar carga inicial
    async setProduct(req, res) {
        const product = await Products.create(req.body);
        return res.status(201).json(product);
    },
};