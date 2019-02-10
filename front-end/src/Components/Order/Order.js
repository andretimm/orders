import React, { Component } from 'react';

import './Styles.css';

export default class Order extends Component {
    render() {
        return (
            <div className="content">
                <div className="content-panel">
                    <div className="header">
                        <div class="order-title">
                            <h2>
                                Pedido
                                    <small className="order-number"> #0001</small>
                            </h2>
                        </div>
                        <div class="total-order">
                            <h2>Total R$00,00</h2>
                        </div>
                        <hr />
                    </div>
                    <form>
                        <input
                            type="text"
                            className="input-order"
                            placeholder="Cliente" />
                        <input type="text" placeholder="produto" />
                        <input type="text" placeholder="quantidade" />
                        <input type="text" placeholder="preço" />
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
                                <td>
                                    <button>Remover</button>
                                </td>
                            </tr>
                            <tr>
                                <td>2</td>
                                <td>Maria Anders</td>
                                <td>Germany</td>
                                <td>Germany</td>
                                <td>
                                    <button>Remover</button>
                                </td>
                            </tr>
                            <tr>
                                <td>3</td>
                                <td>Maria Anders</td>
                                <td>Germany</td>
                                <td>Germany</td>
                                <td>
                                    <button>Remover</button>
                                </td>
                            </tr>
                            <tr>
                                <td>4</td>
                                <td>Maria Anders</td>
                                <td>Germany</td>
                                <td>Germany</td>
                                <td>
                                    <button>Remover</button>
                                </td>
                            </tr>
                            <tr>
                                <td>5</td>
                                <td>Maria Anders</td>
                                <td>Germany</td>
                                <td>Germany</td>
                                <td>
                                    <button>Remover</button>
                                </td>
                            </tr>
                        </table>
                    </form>
                </div>
            </div>
        );
    }
}
