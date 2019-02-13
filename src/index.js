//Dependencias
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

//Instancia aplicacao
const app = express();

//Extrair servidor http
const server = require('http').Server(app);
//Habilita comunicacao via websocket
const io = require('socket.io')(server);

//Conecta banco de dados
mongoose.connect(
    "mongodb://orders:orders123@ds331135.mlab.com:31135/orders",
    {
        useNewUrlParser: true
    }
);

//Disponibiliza o websocket para todas as requisicoes
app.use((req, res, next) => {
    req.io = io;
    return next();
});

app.use(express.static(path.join(__dirname, '/front-end/build')));

//Habilita cross domain
app.use(cors());
//Seta JSON como padrao
app.use(express.json());
//Rotas
app.use(require('./routes'));

//Inicia aplicacao
server.listen(80, () => {
    console.log('Server iniciado na porta 3006');
});

module.exports = app; // Necessario para rodas os testes