import React, { Component } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faPlus } from '@fortawesome/free-solid-svg-icons';
import MaskedInput from 'react-text-mask';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';

import api from '../../Services/Api';

import './Styles.css';

/**
 * Formata valor em reais
 */
const numberMask = createNumberMask({
    prefix: '',
    thousandsSeparatorSymbol: '.',
    allowDecimal: true,
    decimalSymbol: ','
});

export default class Order extends Component {

    state = {
        customerSelected: '',
        productSelected: '',
        order: '0000',
        total: '50,00',
        price: '',
        multiple: 1,
        qtd: '',
        info: '',
        customers: [],
        products: [],
        itens: [],
        edit: true,
    };

    componentDidMount() {
        this.handleStart();
    }

    handleStart = async () => {
        let customers = [];
        let products = [];
        customers = await api.get('api/customers');
        customers = customers.data;
        if (!this.props.order.id) {
            products = await api.get('api/products');
            products = products.data
            this.setState({
                products,
                customers,
                customerSelected: '',
                total: '0',
                order: '0000',
                itens: [],
                edit: true
            });
        } else {
            const { id, customerId, total, itens } = this.props.order;
            this.setState({
                products,
                customers,
                customerSelected: customerId,
                total,
                order: id,
                itens,
                edit: false
            });
        }
    }

    //Atualiza o componente sempre que selecionar outro pedido
    componentWillReceiveProps(props) {
        console.log("refesh");
        const { order } = this.props;
        if (props.order !== order) {
            console.log("refesh");
            this.handleStart();
        }
    }

    handleChangeCustomer = (event) => {
        this.setState({ customerSelected: event.target.value });
    }

    handleChangeProduct = (event) => {
        this.setState({ productSelected: event.target.value });
        if (event.target.value !== "") {
            const { price, multiple } = this.state.products.find((e) => e.id == event.target.value);
            if (multiple > 1) {
                this.setState({ info: `Este produto apenas é vendido em multiplos de ${multiple}. Mas fique tranquilo que fazemos o calculo para você. Ex.:caso você digite 5 vamos multiplicar por ${multiple} resultando em ${multiple * 5}` });
            } else {
                this.setState({ info: '' });
            }
            this.setState({ price, multiple, qtd: '' });
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
        if (event.target.value % this.state.multiple != 0) {
            qtd = qtd * this.state.multiple;
        }
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
                        <div className="input-container">
                            <div class="select-style">
                                <select value={this.state.customerSelected} onChange={this.handleChangeCustomer}>
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

                        <div className={this.state.edit ? 'input-container' : 'hidden'} >
                            <div class="select-style">
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

                            <input
                                type="text"
                                className="input-order input-sm"
                                placeholder="Qtd"
                                value={this.state.qtd}
                                onBlur={this.handleBlurQtd}
                                onChange={this.handleChangeQtd} />

                            <MaskedInput
                                className="input-order input-md"
                                placeholder="Preço"
                                mask={numberMask}
                                value={this.state.price}
                                onChange={this.handleChangePrice}
                            />

                            <button className="btn">
                                <FontAwesomeIcon icon={faPlus} />
                                &nbsp;Adicionar
                            </button>

                        </div>

                        <div className={this.state.edit ? 'info' : 'hidden'}>
                            <hr className="line" />
                            <p>{this.state.info}</p>
                        </div>

                        <table className="products">
                            <tr className="firstRow">
                                <th>Produto</th>
                                <th>Quantidade</th>
                                <th>Preço</th>
                                <th>Total</th>
                                <th>Status</th>
                                <th className={this.state.edit ? '' : 'hidden'}></th>
                            </tr>
                            {this.state.itens.map(item => (
                                <tr key={item.id}>
                                    <td>{item.productName}</td>
                                    <td>{item.qtd}</td>
                                    <td>{item.price}</td>
                                    <td>{item.price * item.qtd}</td>
                                    <td>{item.status}</td>
                                    <td className={this.state.edit ? 'td-center' : 'hidden'}>
                                        <button className="btn-remove">
                                            X
                                     </button>
                                    </td>
                                </tr>
                            ))}
                        </table>
                    </form>
                </div>
            </div>
        );
    }
}
