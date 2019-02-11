const express = require('express');

//Instacia rotas
const routes = express.Router();
//Controllers
const UserController = require('./Controllers/UserController');

//Loga
routes.post('/api/login', UserController.getUser);
//Cria usuario
routes.post('/api/createUser', UserController.setUser);

//Exporta rotas
module.exports = routes;