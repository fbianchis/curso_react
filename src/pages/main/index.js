import React, { Component } from 'react';
import api from '../../services/api';
import './styles.css';

export default class Main extends Component
{
    state = 
    {
        products : [],
    }
    componentDidMount()
    {
        this.loadProducts()
    }
    render()
    {
        const {products} = this.state;
        return (
            <div className = "product-list">
                {products.map(product => 
                (
                    <article key={product._id}>
                        <strong>{product.title}</strong>
                        <p>{product.description}</p>
                        <a href="#">Acessar</a>
                    </article>
                ))}
            </div>
        )
    }
    // para funções que não são da classe, utiliza-se arrow func para poder utilizar this da classe que se é extendidada
    loadProducts = async () => 
    {
        const response = await api.get('./products');
        this.setState({products : response.data.docs});
        console.log(response.data.docs);
    };
}