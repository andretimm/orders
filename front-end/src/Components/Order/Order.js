import React, { Component } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faSave, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { withAlert } from "react-alert";
import Loader from 'react-loader-spinner';
import MaskedInput from 'react-text-mask';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';
import socket from 'socket.io-client';

import api from '../../Services/Api';
import './Styles.css';

/**
 * Formata valor em reais
 */
const moneyMask = createNumberMask({
    prefix: '',
    thousandsSeparatorSymbol: '.',
    allowDecimal: true,
    decimalSymbol: ','
});
const numberMask = createNumberMask({
    prefix: '',
    includeThousandsSeparator: false,
    allowDecimal: false
});

class Order extends Component {

    state = {
        customerSelected: '',
        productSelected: '',
        order: '',
        total: '0,00',
        price: '',
        multiple: 1,
        qtd: '',
        info: '',
        customers: [],
        products: [],
        itens: [],
        edit: true,
        selectedCustomer: false,
        itemIDs: 0,
        errorQtd: false,
        loaded: false,
        status: '',
    };


    componentDidMount() {
        this.handleStart();
        this.subscribeToEvents();
    }

    //Inicia comunicação o servidor socket e fica escutando o evento
    subscribeToEvents = () => {
        const io = socket('http://localhost:3006');
        io.on('newOrder', data => {
            if (this.state.edit) {
                this.getLastOrderID();
            }
        });
    }

    /**
     * 1 - Adionar item
     * 2 - Salvar pedido
     */
    formValidation = (action) => {
        const { alert } = this.props;
        let {
            customerSelected,
            productSelected,
            price,
            qtd,
            itens,
            errorQtd,
            status
        } = this.state;
        if (action === 1) {
            if (customerSelected === '') {
                alert.error("Cliente não informado");
                return false;
            }
            if (productSelected === '') {
                alert.error("Produto não informado");
                return false;
            }
            if (qtd === '') {
                alert.error("Quantidade não informada");
                return false;
            }
            if (price === '') {
                alert.error("Preço não informado");
                return false;
            }
            if (Number(qtd) <= 0) {
                alert("Quantidade deve ser maior que zero");
                return false;
            }
            if (parseFloat(price.replace(/\./g, '').replace(',', '.')) <= 0) {
                alert.error("Preço deve ser maior que zero");
                return false;
            }
            if (errorQtd) {
                alert.error("Quantidade informada inválida. Favor verificar!");
                return false;
            }
            if (status === 'RUIM') {
                alert.error("Produto com rentabilidade RUIM não pode ser adicionado ao pedido");
                return false;
            }
        } else if (action === 2) {
            if (customerSelected === '') {
                alert.error("Cliente não informado");
                return false;
            }
            if (itens.length === 0) {
                alert.error("Para salvar o pedido é necessário ter ao menos 1 (um) item incluído.");
                return false;
            }
            if (errorQtd) {
                alert.error("Quantidade informada inválida. Favor verificar!");
                return false;
            }
            if (status === 'RUIM') {
                alert.error("Produto com rentabilidade RUIM não pode ser adicionado ao pedido");
                return false;
            }
        }
        return true;
    }

    getStatus = (status) => {
        return status === 'OTIMA';
    }

    getLastOrderID = async () => {
        let lastId = await api.get('api/lastorder');
        if (lastId.data) {
            lastId = lastId.data.id + 1;
        } else {
            lastId = 1
        }
        this.setState({ order: lastId });
    }

    handleStart = async () => {
        let customers = [];
        let products = [];
        customers = await api.get('api/customers');
        products = await api.get('api/products');
        products = products.data
        customers = customers.data;
        if (!this.props.order.id) {
            this.getLastOrderID();
            this.setState({
                products,
                customers,
                customerSelected: '',
                productSelected: '',
                total: '0,00',
                price: '',
                multiple: 1,
                qtd: '',
                info: '',
                itens: [],
                edit: true,
                selectedCustomer: false,
                itemIDs: 0,
                loaded: true,
                status: ''
            });
        } else {
            const { id, customerId, total, itens } = this.props.order;
            let productIndex = await api.get('/api/lastproduct/' + id);
            productIndex = productIndex.data.id;
            this.setState({
                products,
                customers,
                customerSelected: customerId,
                total,
                order: id,
                itens,
                edit: false,
                multiple: 1,
                qtd: '',
                info: '',
                productSelected: '',
                price: '',
                selectedCustomer: true,
                itemIDs: productIndex++,
                loaded: true,
                status: ''
            });
        }
    }

    //Atualiza o componente sempre que selecionar outro pedido
    componentWillReceiveProps(props) {
        const { order } = this.props;
        if (props.order !== order) {
            this.setState({ loaded: false });
            this.handleStart();
        }
    }

    sumTotalItem = (price, qtd) => {
        let total = (parseFloat(price.replace(/\./g, '').replace(',', '.') * Number(qtd)));
        total = total.toFixed(2).replace('.', ',').replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
        return total;
    }

    handleChangeCustomer = (event) => {
        this.setState({ customerSelected: event.target.value });
    }

    handleChangeProduct = (event) => {
        this.setState({ productSelected: event.target.value });
        if (event.target.value !== "") {
            const { price, multiple } = this.state.products.find((e) => e.id == event.target.value);
            if (multiple > 1) {
                this.setState({ info: `* Este produto apenas é vendido em múltiplos de ${multiple}.` });
            } else {
                this.setState({ info: '' });
            }
            this.setState({ price: price.toFixed(2).replace('.', ',').replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.'), multiple, qtd: '', status: 'BOA' });
        } else {
            this.setState({ price: '', multiple: 1, qtd: '', status: '' });
        }
    }

    handleChangeQtd = (event) => {
        const qtd = event.target.value;
        this.setState({ qtd });
    }

    handleChangePrice = (event) => {
        let price = event.target.value;
        let status = '';
        const { productSelected } = this.state;
        const produtct = this.state.products.find((e) => e.id === Number(productSelected));
        const newPrice = parseFloat(price.replace(/\./g, '').replace(',', '.'));
        const oldPrice = parseFloat(produtct.price);
        const pricePercent = oldPrice - (oldPrice * 0.10);

        if (parseFloat(newPrice) > parseFloat(oldPrice)) {
            status = "OTIMA";
        } else {
            if (newPrice >= pricePercent && newPrice <= oldPrice) {
                status = "BOA";
            } else if (newPrice < pricePercent) {
                status = "RUIM";
            }
        }

        this.setState({ price, status });
    }

    handleBlurQtd = (event) => {
        let qtd = event.target.value;
        if (qtd % this.state.multiple !== 0) {
            const { alert } = this.props;
            alert.error(`Este produto é vendido apenas em múltiplos de ${this.state.multiple}. Favor ajustar a quantidade !`);
            this.setState({ errorQtd: true });
        } else {
            this.setState({ errorQtd: false });
        }
    }

    handlerAddItem = (e) => {
        e.preventDefault();
        let {
            productSelected,
            total,
            price,
            qtd,
            itens,
            itemIDs,
            status
        } = this.state;

        //Validação de campos
        if (!this.formValidation(1)) return;

        const produtct = this.state.products.find((e) => e.id === Number(productSelected));
        const newPrice = parseFloat(price.replace(/\./g, '').replace(',', '.'));

        total = parseFloat(total.replace(/\./g, '').replace(',', '.')) + (parseFloat(newPrice * Number(qtd)));
        total = total.toFixed(2).replace(/\./g, ',').replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
        itemIDs++;

        this.setState({
            total,
            itemIDs,
            itens: [...itens, {
                id: itemIDs,
                productId: Number(productSelected),
                productName: produtct.name,
                price: price,
                qtd: qtd,
                status,
            }],
            selectedCustomer: true,
            productSelected: '',
            price: '',
            qtd: '',
            info: '',
            errorQtd: false,
            status: ''
        });

    }

    handleRemoveItem = (e, id) => {
        e.preventDefault();
        let { itens, total } = this.state;
        const index = itens.map(item => item.id).indexOf(id);
        if (index == "-1") {
            return;
        }
        const totalItem = this.sumTotalItem(itens[index].price, itens[index].qtd)
        total = parseFloat(total.replace(/\./g, '').replace(',', '.')) - (parseFloat(totalItem.replace(/\./g, '').replace(',', '.')));
        total = total.toFixed(2).replace(/\./g, ',').replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
        itens.splice(index, 1);

        if (total === '0,00') {
            this.setState({ itens, total, selectedCustomer: false });
        } else {
            this.setState({ itens, total });
        }

    }

    handleEdit = (e) => {
        e.preventDefault();
        this.setState({ edit: true });
    }

    handleSaveOrder = async (e) => {
        e.preventDefault();
        //Validação de campos
        if (!this.formValidation(2)) return;

        const { customerSelected, total, itens, order } = this.state;
        const { name } = this.state.customers.find((e) => e.id == customerSelected);
        const user = localStorage.getItem('@OrdersTimm:email');
        const newOrder = {
            id: order,
            customerId: customerSelected,
            customerName: name,
            total,
            user,
            itens
        };

        await api.post('api/orders', newOrder);
        this.props.onSelectOrder({});
        this.handleStart();
    }

    render() {
        const { loaded } = this.state;

        if (!loaded) {
            return (
                <div className="content">
                    <div className="loader-content">
                        <div className="loader">
                            <Loader
                                type="Puff"
                                color="#00cc62"
                                height="100px"
                                width="100px"
                            />
                        </div>
                    </div>
                </div>
            );
        }

        return (
            <div className="content">
                <div className="content-panel">
                    <div className="header">
                        <div className="order-title">
                            <h2>
                                Pedido
                                <small className="order-number"> #{this.state.order}</small>
                            </h2>
                        </div>
                        <div className="total-order">
                            <h2>Total R${this.state.total}</h2>
                        </div>
                        <hr />
                    </div>
                    <form>
                        <div className=" order-customer">
                            <div className="input-container">
                                <select
                                    className="classic"
                                    value={this.state.customerSelected}
                                    onChange={this.handleChangeCustomer}
                                    readonly={this.state.selectedCustomer ? 'true' : 'false'}
                                >
                                    <option value="">Selecione um cliente</option>
                                    {this.state.customers.map(customer => (
                                        <option key={customer.id} value={customer.id}>{customer.name}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className={this.state.edit ? 'order-save' : 'hidden'}>
                            <button className="btn-save" onClick={this.handleSaveOrder}>
                                <FontAwesomeIcon icon={faSave} /> Salvar
                            </button>
                        </div>
                        <div className={!this.state.edit ? 'order-save' : 'hidden'}>
                            <button className="btn-edit" onClick={this.handleEdit}>
                                <FontAwesomeIcon icon={faEdit} /> Editar
                            </button>
                        </div>

                        <hr className="line" />

                        <div className={this.state.edit ? 'input-container' : 'hidden'} >
                            <div className="select-product">
                                <select
                                    className="classic"
                                    value={this.state.productSelected}
                                    onChange={this.handleChangeProduct}
                                >
                                    <option value="">Selecione um produto</option>
                                    {this.state.products.map(product => (
                                        <option key={product.id} value={product.id}>{product.name}</option>
                                    ))}
                                </select>
                            </div>
                            <MaskedInput
                                className="input-order input-sm"
                                placeholder="Qtd"
                                mask={numberMask}
                                value={this.state.qtd}
                                onBlur={this.handleBlurQtd}
                                onChange={this.handleChangeQtd}
                            />
                            <MaskedInput
                                className="input-order input-md"
                                placeholder="Preço"
                                mask={moneyMask}
                                value={this.state.price}
                                onChange={this.handleChangePrice}
                            />

                            <input
                                type="text"
                                className="input-order input-md"
                                value={this.state.status}
                                placeholder="Rentabilidade"
                                readonly='true'
                            />

                            <button className="btn" onClick={this.handlerAddItem}>
                                <FontAwesomeIcon icon={faPlus} />
                                &nbsp;Adicionar
                            </button>

                        </div>

                        <div className={this.state.edit ? 'info' : 'hidden'}>
                            <hr className="line" />
                            <p>{this.state.info}</p>
                        </div>

                        <table className="products">
                            <thead>
                                <tr className="firstRow">
                                    <th>Produto</th>
                                    <th>Quantidade</th>
                                    <th>Preço</th>
                                    <th>Total</th>
                                    <th>Rentabilidade</th>
                                    <th className={this.state.edit ? '' : 'hidden'}></th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.itens.map(item => (
                                    <tr key={item.id}>
                                        <td>{item.productName}</td>
                                        <td>{item.qtd}</td>
                                        <td>{item.price}</td>
                                        <td>{this.sumTotalItem(item.price, item.qtd)}</td>
                                        <td className={this.getStatus(item.status) ? 'td-center status-great' : 'td-center status-good'}>
                                            {item.status}
                                        </td>
                                        <td className={this.state.edit ? 'td-center' : 'hidden'}>
                                            <button className="btn-remove" onClick={(e) => this.handleRemoveItem(e, item.id)}>
                                                <FontAwesomeIcon icon={faTrash} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </form>
                </div>
            </div>
        );
    }
}

//Disponibiliza a mensagem de alert como propriedade
export default withAlert()(Order)