const Users = require('../Models/Users');

module.exports = {
    //Retorna usuario
    async getUser(req, res) {
        let email req.body.email;
        const user = await Users.find({ email: email }).sort('-createdAt');
        return res.status(200).json(user);
    },
    //Cria novo usuario
    async setUser(req, res) {
        const user = await Users.create(req.body);
        return res.status(201).json(user);
    },
};