import React, { Component } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown, faPlus } from '@fortawesome/free-solid-svg-icons'

import api from '../../Services/Api';

import './Styles.css';

export default class Order extends Component {

    state = {
        customerSelected: '',
        productSelected: '',
        order: '0000',
        total: '50,00',
        price: '',
        multiple: 1,
        qtd: '',
        customers: [],
        products: []
    };

    async componentDidMount() {
        const customers = await api.get('api/customers');
        const products = await api.get('api/products');
        this.setState({ products: products.data, customers: customers.data });
    }

    handleChanceCustomer = (event) => {
        this.setState({ customerSelected: event.target.value });
    }

    handleChanceProduct = (event) => {
        this.setState({ productSelected: event.target.value });
        if (event.target.value !== "") {
            const { price, multiple } = this.state.products.find((e) => e.id == event.target.value);
            if (multiple > 1) {
                alert(`Este produto se é vendido em multiplos de ${multiple}. Mas fique tranquilo que fazemos o calculo para você. Ex.:caso você digite 5 vamos multiplicar por ${multiple} resultando em ${multiple * 5}`)
            }
            this.setState({ price, multiple, qtd: '' });
        } else {
            this.setState({ price: '', multiple: 1, qtd: '' });
        }
    }

    handleChanceQtd = (event) => {
        const qtd = event.target.value * this.state.multiple;
        this.setState({ qtd });
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
                        <div class="total-order">
                            <h2>Total R${this.state.total}</h2>
                        </div>
                        <hr />
                    </div>
                    <form>

                        <div class="input-container">
                            <div class="select-style">
                                <select value={this.state.customerSelected} onChange={this.handleChanceCustomer}>
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

                        <hr className="line" />

                        <div class="input-container">
                            <div class="select-style">
                                <select value={this.state.productSelected} onChange={this.handleChanceProduct}>
                                    <option value="">Selecione um produto</option>
                                    {this.state.products.map(product => (
                                        <option key={product.id} value={product.id}>{product.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="icon-container">
                                <FontAwesomeIcon className="icon" icon={faChevronDown} />
                            </div>

                            <input
                                type="text"
                                className="input-order input-sm"
                                placeholder="Qtd"
                                value={this.state.qtd}
                                onChange={this.handleChanceQtd} />

                            <input
                                type="text"
                                className="input-order input-md"
                                placeholder="Preço"
                                value={this.state.price} />

                            <button className="btn">
                                <FontAwesomeIcon icon={faPlus} />
                                &nbsp;Adicionar
                            </button>

                        </div>

                        <table>
                            <tr>
                                <th>#</th>
                                <th>Produto</th>
                                <th>Quantidade</th>
                                <th>Preço</th>
                                <th></th>
                            </tr>
                            <tr>
                                <td>1</td>
                                <td>Maria Anders</td>
                                <td>Germany</td>
                                <td>Germany</td>
                                <td className="td-center">
                                    <button className="btn-remove">
                                        X
                                    </button>
                                </td>
                            </tr>
                            <tr>
                                <td>2</td>
                                <td>Maria Anders</td>
                                <td>Germany</td>
                                <td>Germany</td>
                                <td className="td-center">
                                    <button className="btn-remove">
                                        X
                                    </button>
                                </td>
                            </tr>
                            <tr>
                                <td>3</td>
                                <td>Maria Anders</td>
                                <td>Germany</td>
                                <td>Germany</td>
                                <td className="td-center">
                                    <button className="btn-remove">
                                        X
                                    </button>
                                </td>
                            </tr>
                            <tr>
                                <td>4</td>
                                <td>Maria Anders</td>
                                <td>Germany</td>
                                <td>Germany</td>
                                <td className="td-center">
                                    <button className="btn-remove">
                                        X
                                    </button>
                                </td>
                            </tr>
                            <tr>
                                <td>5</td>
                                <td>Maria Anders</td>
                                <td>Germany</td>
                                <td>Germany</td>
                                <td className="td-center">
                                    <button className="btn-remove">
                                        X
                                    </button>
                                </td>
                            </tr>
                        </table>
                    </form>
                </div>
            </div>
        );
    }
}
