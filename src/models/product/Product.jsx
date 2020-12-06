import React from 'react';
import { Link } from 'react-router-dom';

import "./Product.css"

export default class Product extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            title: props.title,
            subtitle: props.subtitle,
            price: props.price,
            images: props.images,
            category: props.category,
            describe: props.describe,
            views: props.views,
            weight: props.weight,
            cep_origem: props.cep_origem,
        }
    }

    render() {
        return (
            <div id="product">
                <center>
                    <figure style={{ margin: 10 }}>
                        <img id="image-product" src={this.state.images[0]} />
                    </figure>
                    <Link to={
                        { pathname:"/produto",  state: {
                            produto: this.state
                          } }} >
                        <h2 id="title">{this.state.title}</h2>
                        <p id="subtitle">{this.state.subtitle}</p>
                        <h5 id="price">R${this.state.price}</h5>
                    </Link>
                </center>
            </div>
        )
    }
}