//Dependencias
const express = require('express');
const cors = require('cors');
const path = require('path');
const port = process.env.PORT || 3000;
//Instancia aplicacao
const app = express();

//Extrair servidor http
const server = require('http').Server(app);

app.use(express.static(path.join(__dirname, '/build')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/build/index.html'));
});

//Habilita cross domain
app.use(cors());

//Inicia aplicacao
server.listen(port, () => {
    console.log('Server iniciado na porta ' + port);
});

module.exports = app; 