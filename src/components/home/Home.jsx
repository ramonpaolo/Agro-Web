//---- Packages
import React from 'react';
import { ReloadOutlined } from "@ant-design/icons"

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
        if (this.state.products.length != 0) {
            return (
                <div id="home">
                    <center>
                        <h1>Home</h1>
                        <div id="row">
                            {this.state.products.map((product) =>
                                <Product title={product.title} subtitle={product.subtitle}
                                    price={product.price} image={product.image} category={product.category}
                                    describe={product.describe} weight={product.weight} cep_origem={product.cep_origem}
                                    views={product.views} key={product.id} />)}
                        </div>
                    </center>
                </div>
            )
        } else {
            return (<div>
                <center>
                    <ReloadOutlined spin style={{ fontSize: 60, marginBottom: 20, marginTop: 20, color: "green" }}></ReloadOutlined>
                </center>
            </div>)
        }
    }
}