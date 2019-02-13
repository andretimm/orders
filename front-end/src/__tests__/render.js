import React from 'react'
import Enzyme, { render } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Login from '../Pages/Login/Login';
import Dashboard from '../Pages/Dashboard/Dashboard';

import Header from '../Components/Header/Header';
import Navigation from '../Components/Navigation/Navigation';
import Order from '../Components/Order/Order';

Enzyme.configure({ adapter: new Adapter() });

describe('Login', () => {
    it('Deve renderizar o componente de Login sem erros', () => {
        render(<Login />)
    })
});

describe('Dashboard', () => {
    it('Deve renderizar o componente Dashboard sem erros', () => {
        render(<Dashboard />)
    })
});

describe('Header', () => {
    it('Deve renderizar o componente Header sem erros', () => {
        render(<Header />)
    })
});

describe('Navigation', () => {
    it('Deve renderizar o componente Navigation sem erros', () => {
        render(<Navigation />)
    })
});

describe('Order', () => {
    it('Deve renderizar o componente Order sem erros', () => {
        render(<Order />)
    })
});