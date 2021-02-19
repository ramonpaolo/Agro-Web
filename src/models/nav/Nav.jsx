//---- Packages
import React from 'react';
import { Link, Redirect } from 'react-router-dom';

//---- Style
import "./Nav.css"

//---- Backend
import firebase from "../../backend/FirebaseService"

export default class Nav extends React.Component {
    state = {
        search: '',
        product: {title: null}
    }

    async findProduct(e){
        //console.log(e)
        this.setState({search: e}) 
        
        await (await firebase.firestore().collection("products").where("title", "==", e).get()).forEach(async (item) => {
            //console.log(item.data())
            this.setState({ product: item.data() })
        })
    }

    render() {
        return (
            <div id="nav">
                <nav>
                    <input type="text" value={this.state.search} placeholder="Busque pelo produto aqui"
                        onChange={(e) => this.findProduct(e.target.value)} />
                        {
                            this.state.product["title"] !== null ? <Redirect to={{pathname: "/search", state: {search: this.state.product}}}></Redirect> : null
                        }
                    <Link to="/">Home</Link>
                    <Link to="/user" >User</Link>
                </nav>
            </div>
        )
    }
}