//---- Packages
import React from "react"
import { Circle, MapContainer, Popup, TileLayer } from "react-leaflet"
import CoordenadasDoCep from "coordenadas-do-cep"

//---- Styles
import "./Search.css"

//---- Backend
import firebase from "../../backend/FirebaseService"

export default class Search extends React.Component {
    constructor(props) {
        super(props)
        console.log(props)
        this.state = {
            search: {
                id: 0,
                title: "",
                image: []
            },
            lat: 0,
            lon: 0
        }
    }

    async getLocation() {
        await CoordenadasDoCep.getByCep(this.state.search.cep_origem).then((data) => {
            console.log(data)
            this.setState({ lat: data.lat })
            this.setState({ lon: data.lon })
        })
    }

    async searchProducts() {
        const splitado = window.location.href.split("?")[1]
        console.log(splitado)
        await (await firebase.firestore().collection("products").where("title", "==", splitado).get()).forEach(async (item) => {
            this.setState({ search: item.data() })
        })
        await this.getLocation()
    }

    async componentDidUpdate() {
        if (this.state.search.title != window.location.href.split("?")[1]) await this.searchProducts()
    }

    render() {
        if (this.state.lon != 0) {
            return (
                <center>
                    <div id="info-product">
                        <figure>
                            <img id="image-product" src={this.state.search.image[0]} alt="asdasdasd" />
                        </figure>

                        <div id="info-text-product">
                            <h2 id="title">{this.state.search.title}</h2>
                            <h5 id="subtitle">{this.state.search.subtitle}</h5>
                            <span id="price">R${this.state.search.price}</span>
                            <br />
                            <br />
                            <input id="input-product" placeholder="Digite seu CEP" type="number" />
                            <br />

                            <button id="calcular-frete" type="">Calcular Frete</button>
                            <h3>Descrição: </h3>
                            <p id="describe">{this.state.search.describe}</p>
                            <p>Peso Produto: {this.state.search.weight}</p>
                            <p>Categoria: {this.state.search.category}</p>
                            <p>Views: {this.state.search.views}</p>
                        </div>
                    </div>
                    <MapContainer center={[this.state.lat, this.state.lon]} zoom={15}>
                        <TileLayer attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"></TileLayer>
                        <Circle center={[this.state.lat, this.state.lon]} radius={500}>
                            <Popup>
                                Produto pertence a essa cidade
                                    </Popup>
                        </Circle>
                    </MapContainer>
                </center>
            )
        } else {
            return <div>
                <center>
                    <h1>Carregando</h1>
                </center>
            </div>
        }
    }
}