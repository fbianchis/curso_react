import React, { Component } from 'react';
import api from '../../services/api';
import './styles.css';

export default class Main extends Component
{
    state = 
    {
        products : [],
        productInfo : {},
        page : 1,
    }
    componentDidMount()
    {
        this.loadProducts()
    }
    nextPage = () =>
    {
        const {page, productInfo} = this.state;

        if(page === productInfo.pages)
        {
            return
        }

        const pageNumber = page + 1;
        this.loadProducts(pageNumber);
    };
    prevPage = () =>
    {
        const {page, productInfo} = this.state;

        if(page === 1)
        {
            return
        }

        const pageNumber = page - 1;
        this.loadProducts(pageNumber);
    };
    render()
    {
        const {products, page, productInfo} = this.state;
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
                <div className= "actions">
                    <button disabled = {page ===1 } onClick={this.prevPage}>Anterior</button>
                    <button disabled = {page === productInfo.pages} onClick={this.nextPage}>Próxima</button>
                </div>
            </div>
        );
    }
    // para funções que não são da classe, utiliza-se arrow func para poder utilizar this da classe que se é extendidada
    loadProducts = async (page = 1) => 
    {
        const response = await api.get(`./products?page=${page}`);
        
        const {docs, ...productInfo} = response.data;
        this.setState({products : docs, productInfo, page});
        //console.log(response.data.docs);
    };
}