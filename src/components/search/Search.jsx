//---- Packages
import React from "react"
import { Circle, MapContainer, Popup, TileLayer } from "react-leaflet"
import CoordenadasDoCep from "coordenadas-do-cep"

//---- Styles
import "./Search.css"
import { ReloadOutlined } from "@ant-design/icons"

export default class Search extends React.Component {
    constructor(props) {
        super(props)
        console.log(props.history.location.state.search)
        this.state = {
            product: props.history.location.state.search,
            lat: 0.0,
            lon: 0.0
        }
    }

    async transformCepInLocation() {
        await CoordenadasDoCep.getByCep(this.state.product.cep_origem)
            .then((data) => this.setState({ lon: data.lon, lat: data.lat }))
            .catch((error) => console.log(error));
    }

    changeImage(e) {
        const mainImage = document.getElementById("image-product")
        mainImage.setAttribute("src", e["src"])
    }

    async componentDidMount() {
        await this.transformCepInLocation();
    }

    render() {
        if (this.state.lat !== 0.0) {
            return (
                <div>
                    <center>
                        <div id="info-product">
                            {this.state.product.image.length >= 2 && window.innerWidth >= 701 && window.innerWidth <= 999 ? <div id="images-left">
                                {this.state.product.image.map((value) => {
                                    console.log(value)
                                    return <img id="image" src={value} alt={this.state.product.title} key={value} onClick={(e) => this.changeImage(e.target)} />
                                })
                                }</div> : null}
                            <figure>
                                <img id="image-product" src={this.state.product.image[0]} />
                            </figure>
                            {this.state.product.image.length >= 2 ? window.innerWidth <= 700 ? <div id="images-left-small">
                                {this.state.product.image.map((value) => {
                                    console.log(value)
                                    return <img id="image-small" src={value} alt={this.state.product.title} key={value} onClick={(e) => this.changeImage(e.target)} />
                                })
                                }</div> : null : null}
                            <div id="info-text-product">
                                <h2 id="title">{this.state.product.title}</h2>
                                <h5 id="subtitle">{this.state.product.subtitle}</h5>
                                <span id="price">R${this.state.product.price}</span>
                                <br />
                                <br />
                                <input
                                    id="input-product"
                                    placeholder="Digite seu CEP"
                                    type="number"
                                />
                                <br />
                                <button
                                    id="calcular-frete"
                                    type="button"
                                    onClick={async () => await this.calcCEP()}
                                >
                                    Calcular Frete
                                </button>
                                <h3>Descrição: </h3>
                                <p id="describe">{this.state.product.describe}</p>
                                <p>Peso Produto: {this.state.product.weight}</p>
                                <p>Categoria: {this.state.product.category}</p>
                            </div>
                        </div>
                        {this.state.product.image.length >= 2 && window.innerWidth >= 1000 ?
                            <div id="images-left-small">
                                {this.state.product.image.map((value) => {
                                    console.log(value)
                                    return <img id="image-small" src={value} alt={this.state.product.title} key={value} onClick={(e) => this.changeImage(e.target)} />
                                })
                                }
                            </div> : null}
                        <MapContainer center={[this.state.lat, this.state.lon]} zoom={15}>
                            <TileLayer
                                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            ></TileLayer>
                            <Circle center={[this.state.lat, this.state.lon]} radius={500} color="green">
                                <Popup>Produto pertence a essa região</Popup>
                            </Circle>
                        </MapContainer>
                    </center>
                </div>
            );
        } else {
            return (
                <div>
                    <center>
                        <ReloadOutlined spin style={{ fontSize: 60, marginBottom: 20, marginTop: 20, color: "green" }}></ReloadOutlined>
                    </center>
                </div>
            );
        }
    }
}