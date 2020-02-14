import React, { Component } from 'react';
import api from '../../services/api'
export default class Main extends Component
{
    componentDidMount()
    {
        this.loadProducts()
    }
    render()
    {
        return <h1>Hello World</h1>;
    }
    // para funções que não são da classe, utiliza-se arrow func para poder utilizar this da classe que se é extendidada
    loadProducts = async () => 
    {
        const response = await api.get('./products');
        console.log(response.data.docs);
    };
}