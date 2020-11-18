import React from 'react';

import "./Product.css"

export default class Product extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            title: props.title,
            subtitle: props.subtitle,
            price: props.price,
            images: props.images,
        }
    }

    render() {
        return (
            <div id="product">
                <center>
                    <figure style={{ margin: 10 }}>
                        <img id="image-product" src={this.state.images[0]} />
                    </figure>
                    <h2 id="title">{this.state.title}</h2>
                    <h4 id="subtitle">{this.state.subtitle}</h4>
                    <h5 id="price">R${this.state.price}</h5>
                </center>
            </div>
        )
    }
}