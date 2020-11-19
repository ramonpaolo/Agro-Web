import Axios from 'axios';
import React from 'react';
import { Circle, MapContainer, Popup, TileLayer } from 'react-leaflet';

import "leaflet/dist/leaflet.css"
import "./Produto.css"

export default class Product extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: props.location.state.produto.title,
            subtitle: props.location.state.produto.subtitle,
            price: props.location.state.produto.price,
            images: props.location.state.produto.images,
            category: props.location.state.produto.category,
            describe: props.location.state.produto.describe,
            views: props.location.state.produto.views,
            weight: props.location.state.produto.weight,
            cep_origem: props.location.state.produto.cep_origem,
            lat: 0.0,
            lon: 0.0
        }
    }

    async getLocation() {
        navigator.geolocation.getCurrentPosition(async (position) => {
            this.setState({ lat: position.coords.latitude })
            this.setState({ lon: position.coords.longitude })
            await this.getCallApi();
        })
    }
    async getCallApi() {
        const url = `https://api.opencagedata.com/geocode/v1/json?q=Itapeva&key=0413d527b0264812850b4ee3eeddff13`;
        const data = await (await Axios.get(url)).data
        this.setState({ lon: await data["results"][0]["geometry"]["lng"] })
        this.setState({ lat: await data["results"][0]["geometry"]["lat"] })
        console.log(await data["results"][0]["geometry"])

    }

    async componentDidMount() {
        //await this.getLocation()
        await this.getCallApi()
    }

    render() {
        if (this.state.lat != 0.0) {
            return (
                <div>
                    <center>
                        <div id="info-product">
                            <figure>
                                <img id="image-product" src={this.state.images[0]} />
                            </figure>
                            <div id="info-text-product">
                                <h2 id="title">{this.state.title}</h2>
                                <h5 id="subtitle">{this.state.subtitle}</h5>
                                <span id="price">R${this.state.price}</span>
                                <br />
                                <br />
                                    <input id="input-product" placeholder="Digite seu CEP" type="number" />
                                    <br/>
                                    
                                    <button id="calcular-frete" type="">Calcular Frete</button>
                                <h3>Descrição: </h3>
                                <p id="describe">{this.state.describe}</p>
                                <p>Peso Produto: {this.state.weight}</p>
                                <p>Categoria: {this.state.category}</p>
                                <p>Views: {this.state.views}</p>
                                 </div>
                            {
                                //this.state.cep_origem
                            }
                        </div>
                        <MapContainer center={[this.state.lat, this.state.lon]} zoom={15}>
                            <TileLayer attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"></TileLayer>
                        </MapContainer>
                    </center>
                </div>
            )
        } else {
            return <div><h2>Carregando</h2></div>
        }
    }
}