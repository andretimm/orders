const express = require('express');

//Instacia rotas
const routes = express.Router();
//Controllers
const UserController = require('./Controllers/UserController');
const ProductController = require('./Controllers/ProductController');
const CustomersControllers = require('./Controllers/CustomersControllers');
const OrderController = require('./Controllers/OrderController');

//Loga
routes.post('/api/login', UserController.getUser);
//Cria usuario
routes.post('/api/createUser', UserController.setUser);
//Cria ordem
routes.post('/api/orders', OrderController.setOrder);


//Retorna produtos
routes.get('/api/products', ProductController.getProduct);
//Retorna clientes
routes.get('/api/customers', CustomersControllers.getCustomer);
//Retornar Ordens
routes.get('/api/orders', OrderController.getOrder);

//Exporta rotas
module.exports = routes;