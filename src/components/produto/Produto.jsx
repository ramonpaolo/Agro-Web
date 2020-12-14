//---- Packages
import React from "react";
import { Circle, MapContainer, Popup, TileLayer } from "react-leaflet";
import CoordenadasDoCep from "coordenadas-do-cep";
import { calcularPrecoPrazo } from "correios-brasil";
import Correios from "node-correios/lib/correios";
import { ReloadOutlined } from "@ant-design/icons"

//---- Styles
import "leaflet/dist/leaflet.css";
import "./Produto.css";

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
      lon: 0.0,
    };
  }

  async calcCEP(cep) {
    const args = {
      sCepOrigem: "18403040",
      sCepDestino: "18403040",
      nVlPeso: "1",
      nCdFormato: "1",
      nVlComprimento: "20",
      nVlAltura: "20",
      nVlLargura: "20",
      nCdServico: ["04014", "04510"], //Array com os códigos de serviço
      nVlDiametro: "0",
    };

    await calcularPrecoPrazo(args).then((response) => {
      console.log(response);
    });

    /*const correios = await new Correios();

    await correios
      .calcPreco({
        sCepOrigem: `18403040`,
        sCepDestino: "18403040",
        nCdServico: "04014",
        nVlPeso: "2",
        nCdFormato: 1,
        nVlComprimento: 30,
        nVlAltura: 10,
        nVlLargura: 10,
        nVlDiametro: 10,
        sCdMaoPropria: "S",
        nVlValorDeclarado: 0,
        sCdAvisoRecebimento: "N",
      })
      .then((data) => {
        console.log("Data: " + data);
      })
      .catch((error) => {
        console.log("Error: " + error);
      }); */
  }

  async transformCepInLocation() {
    await CoordenadasDoCep.getByCep(this.state.cep_origem)
      .then((data) => this.setState({ lon: data.lon, lat: data.lat }))
      .catch((error) => console.log(error));
  }

  async componentDidMount() {
    await this.transformCepInLocation();
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
                <p id="describe">{this.state.describe}</p>
                <p>Peso Produto: {this.state.weight}</p>
                <p>Categoria: {this.state.category}</p>
              </div>
            </div>
            <MapContainer center={[this.state.lat, this.state.lon]} zoom={15}>
              <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              ></TileLayer>
              <Circle center={[this.state.lat, this.state.lon]} radius={500}>
                <Popup>Produto pertence a essa cidade</Popup>
              </Circle>
            </MapContainer>
          </center>
        </div>
      );
    } else {
      return (
        <div>
          <center>
            <ReloadOutlined spin style={{ fontSize: 60, marginBottom: 20, marginTop: 20,color:"green" }}></ReloadOutlined>
          </center>
        </div>
      );
    }
  }
}
