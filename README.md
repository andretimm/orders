# Pedidos
### [DEMO](https://pedido-timm.herokuapp.com/)
# Rodar Local

```sh
$ git clone https://github.com/andretimm/orders.git
$ cd orders
//Baixar dependências backend
$ yarn install
//Baixar dependências frontend
$ cd front-end
$ yarn install
```
O projeto é dividido em 2 (duas) partes (Back e Front), será necessario abrir duas instancias do terminal para roda-las

```sh
//Terminal 1 frontend dentro da pasta raiz
$ cd front-end
$ yarn build & yarn start
```

```sh
//Terminal 2 backend dentro da pasta raiz
$ yarn start
```

O backend será executado no endereço `http://localhost:3006/` e o frontend no endereço `http://localhost:3000/`.
Com o projeto rodando será necessario criar um usuário para acessar, para isto basta fazer uma requisição `POST`(com a ferramenta de sua escolha) no endereço `http://localhost:3006/api/createUser` enviando os seguindes dados :
```json
{
    email : "seu@email.com",
    name : "Seu Nome"
}
```

# Teste

### Backend

Dentro da pasta `raiz`:
```sh
$ yarn test
```

### Frontend

Dentro da pasta `raiz\front-end`:
```sh
$ yarn test
```