const express = require('express');

//Instacia rotas
const routes = express.Router();
//Controllers
const UserController = require('./Controllers/UserController');
const ProductController = require('./Controllers/ProductController');
const CustomersControllers = require('./Controllers/CustomersControllers');

//Loga
routes.post('/api/login', UserController.getUser);
//Cria usuario
routes.post('/api/createUser', UserController.setUser);

//Retorna produtos
routes.get('/api/products', ProductController.getProduct);

routes.get('/api/customers', CustomersControllers.getCustomer);

//Exporta rotas
module.exports = routes;