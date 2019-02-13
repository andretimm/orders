import React, { Component } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faPlus, faSave, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
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

export default class Order extends Component {

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
        let {
            customerSelected,
            productSelected,
            price,
            qtd,
            itens
        } = this.state;
        if (action === 1) {
            if (customerSelected === '') {
                alert("Cliente não informado");
                return false;
            }
            if (productSelected === '') {
                alert("Produto não informado");
                return false;
            }
            if (qtd === '') {
                alert("Quantidade não informada");
                return false;
            }
            if (price === '') {
                alert("Preço não informado");
                return false;
            }
            if (Number(qtd) <= 0) {
                alert("Quantidade deve ser maior que zero");
                return false;
            }
            if (parseFloat(price.replace(/\./g, '').replace(',', '.')) <= 0) {
                alert("Preço deve ser maior que zero");
                return false;
            }
        } else if (action === 2) {
            if (customerSelected === '') {
                alert("Cliente não informado");
                return false;
            }
            if (itens.length === 0) {
                alert("Para salvar o pedido é necessário ter ao menos 1 (um) item incluído.");
                return false;
            }
        }
        return true;
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
                itemIDs: productIndex++
            });
        }
    }

    //Atualiza o componente sempre que selecionar outro pedido
    componentWillReceiveProps(props) {
        const { order } = this.props;
        if (props.order !== order) {
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
                this.setState({ info: `Este produto apenas é vendido em multiplos de ${multiple}. Mas fique tranquilo que fazemos o calculo para você. Ex.: Caso você digite 5 vamos multiplicar por ${multiple} resultando em ${multiple * 5}` });
            } else {
                this.setState({ info: '' });
            }
            this.setState({ price: price.toFixed(2).replace('.', ',').replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.'), multiple, qtd: '' });
        } else {
            this.setState({ price: '', multiple: 1, qtd: '' });
        }
    }

    handleChangeQtd = (event) => {
        const qtd = event.target.value;
        this.setState({ qtd });
    }

    handleChangePrice = (event) => {
        let price = event.target.value;
        this.setState({ price });
    }

    handleBlurQtd = (event) => {
        let qtd = event.target.value;
        if (event.target.value % this.state.multiple !== 0) {
            qtd = qtd * this.state.multiple;
        }
        this.setState({ qtd });
    }

    handlerAddItem = (e) => {
        e.preventDefault();
        let {
            productSelected,
            total,
            price,
            qtd,
            itens,
            itemIDs
        } = this.state;

        //Validação de campos
        if (!this.formValidation(1)) return;

        const { name } = this.state.products.find((e) => e.id === Number(productSelected));

        total = parseFloat(total.replace(/\./g, '').replace(',', '.')) + (parseFloat(price.replace(/\./g, '').replace(',', '.') * Number(qtd)));
        total = total.toFixed(2).replace(/\./g, ',').replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
        itemIDs++;
        this.setState({
            total,
            itemIDs,
            itens: [...itens, {
                id: itemIDs,
                productId: Number(productSelected),
                productName: name,
                price: price,
                qtd: qtd,
                status: "b"
            }],
            selectedCustomer: true,
            productSelected: '',
            price: '',
            qtd: ''
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
                                <div className="select-style">
                                    <select value={this.state.customerSelected} onChange={this.handleChangeCustomer} readonly={this.state.selectedCustomer ? 'true' : 'false'}>
                                        <option value="">Selecione um cliente</option>
                                        {this.state.customers.map(customer => (
                                            <option key={customer.id} value={customer.id}>{customer.name}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="icon-container">
                                    <FontAwesomeIcon className="icon" icon={faChevronDown} />
                                </div>
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
                            <div className="select-style">
                                <select value={this.state.productSelected} onChange={this.handleChangeProduct}>
                                    <option value="">Selecione um produto</option>
                                    {this.state.products.map(product => (
                                        <option key={product.id} value={product.id}>{product.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="icon-container">
                                <FontAwesomeIcon className="icon" icon={faChevronDown} />
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
                                        <td>{item.status}</td>
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
