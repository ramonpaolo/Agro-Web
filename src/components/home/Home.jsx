import React from 'react';

//---- Style
import "./Home.css"

//---- Screens
import Product from '../../models/product/Product'

//---- Backend
import firebase from '../../backend/FirebaseService'

export default class Home extends React.Component {

    state = {
        products: []
    }

    async getProducts() {
        await (await firebase.firestore().collection("products").get()).forEach((product) => {
            this.setState({ products: [...this.state.products, product.data()] })
        })
    }

    async componentDidMount() {
        await this.getProducts()
    }

    render() {
        return (
            <div id="home">
                <h1>Home</h1>
                <div id="row">
                    {this.state.products.map((product) =>
                        <Product title={product.title} subtitle={product.subtitle}
                            price={product.price} images={product.image} />)}
                </div>
            </div>
        )
    }
}