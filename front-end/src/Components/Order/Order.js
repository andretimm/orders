import React, { Component } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import './Styles.css';

export default class Order extends Component {
    render() {
        return (
            <div className="content">
                <div className="content-panel">
                    <div className="header">
                        <div className="order-title">
                            <h2>
                                Pedido
                                    <small className="order-number"> #0000</small>
                            </h2>
                        </div>
                        <div class="total-order">
                            <h2>Total R$0</h2>
                        </div>
                        <hr />
                    </div>
                    <form>
                        <div>
                            <div class="input-container">
                                <input
                                    type="text"
                                    className="input-order-group input-md"
                                    placeholder="Cod. Cliente" />
                                <div className="icon-container">
                                    <FontAwesomeIcon className="icon" icon={faSearch} />
                                </div>
                                <input
                                    type="text"
                                    className="input-order input-lg"
                                    placeholder="Nome Cliente" readOnly tabIndex="-1" />
                            </div>
                            
                        </div>
                        <hr className="line" />
                        <div>
                            <input
                                type="text"
                                className="input-order input-md"
                                placeholder="Cod. Produto" />
                            <input
                                type="text"
                                className="input-order input-lg"
                                placeholder="Produto" readOnly tabIndex="-1" />
                            <input
                                type="text"
                                className="input-order input-sm"
                                placeholder="Qtd" />
                            <input
                                type="text"
                                className="input-order input-md"
                                placeholder="Preço" />
                            <button className="btn">Adicionar</button>
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
