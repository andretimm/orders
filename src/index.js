//Dependencias
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const port = process.env.PORT || 3006;
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

//Habilita cross domain
app.use(cors());
//Seta JSON como padrao
app.use(express.json());
//Rotas
app.use(require('./routes'));

//Inicia aplicacao
server.listen(port, () => {
    console.log('Server iniciado na porta ' + port);
});

module.exports = app; // Necessario para rodas os testes