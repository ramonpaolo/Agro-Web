import React from 'react';
import { Link } from 'react-router-dom';

import "./Product.css"

export default class Product extends React.Component {

    constructor(props) {
        super(props);
        console.log(props)
        this.state = {
            product: props
        }
    }

    render() {
        return (
            <div id="product">
                <center>
                    <figure style={{ margin: 10 }}>
                        <img id="image-product" src={this.state.product.image[0]} />
                    </figure>
                    <Link to={
                        {
                            pathname: "/produto", state: {
                                product: this.state.product
                            }
                        }} >
                        <h2 id="title">{this.state.product.title}</h2>
                        <h4 id="subtitle">{this.state.product.subtitle}</h4>
                        <div id="circle">
                            <h5 id="price">R${this.state.product.price}</h5>
                        </div>
                    </Link>
                </center>
            </div>
        )
    }
}