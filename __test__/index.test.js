const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../src/index');
const should = chai.should();

//Model
const Orders = require('../src/Models/Orders');

chai.use(chaiHttp);
let orderNumer = 0;
describe('Orders', () => {
    //Login
    describe('/POST login', () => {
        it('Deve retornar os dados o usuário', (done) => {
            const login = {
                email: "andretimm2012@gmail.com",
            }
            chai.request(server)
                .post('/api/login')
                .send(login)
                .set('x-access-token', '')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.have.property('email');
                    done();
                });
        });
    });

    //GET Produtos
    describe('/GET Products', () => {
        it('Deve retornar todos os produtos', (done) => {
            chai.request(server)
                .get('/api/products')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    done();
                });
        });
    });

    //GET Clientes
    describe('/GET Customers', () => {
        it('Deve retornar todos os clientes', (done) => {
            chai.request(server)
                .get('/api/customers')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    done();
                });
        });
    });

    //GET Pedidos
    describe('/GET Orders', () => {
        it('Deve retornar todos os pedidos', (done) => {
            chai.request(server)
                .get('/api/orders')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    done();
                });
        });
    });

    //GET Ultimo id do pedido
    describe('/GET LastOrder', () => {
        it('Deve retornar o id do ultimo pedido', (done) => {
            chai.request(server)
                .get('/api/lastorder')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.have.property('id');
                    done();
                });
        });
    });


    //Post
    describe('/POST Orders', () => {
        it('Deve criar uma nova ferramenta', (done) => {
            const Orders = {
                id: 99,
                customerId: 2,
                customerName: "Obi-Wan Kenobi",
                total: "41.600,00",
                user: "[unit-teste]",
                itens: [
                    {
                        id: 1,
                        productId: 6,
                        productName: "DLT-19 Heavy Blaster Rifle",
                        price: "5.800,00",
                        qtd: 2,
                        status: "b"
                    },
                    {
                        id: 2,
                        productId: 5,
                        productName: "Lightsaber",
                        price: "6.000,00",
                        qtd: 5,
                        status: "b"
                    }
                ]
            };
            chai.request(server)
                .post('/api/orders')
                .send(Orders)
                .end((err, res) => {
                    res.should.have.status(201);
                    res.body.should.have.property('id');
                    orderNumer = res.body.id;
                    console.log(orderNumer);
                    done();
                });
        });

    });

    //GET Ultimo id produto do pedido
    describe('/GET LastOrder', () => {
        it('Deve retornar o id do ultimo produto do pedido', (done) => {
            chai.request(server)
                .get('/api/lastproduct/' + orderNumer)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.have.property('id');
                    done();
                });
        });
    });

    //Deleta registro gerados no teste
    describe('Delte Order', () => {
        it('Remove registros gerado via teste', (done) => {
            Orders.deleteMany({ user: '[unit-teste]' }, (err) => {
                done();
            });
        });
    });

});



