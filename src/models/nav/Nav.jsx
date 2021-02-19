//---- Packages
import React from 'react';
import { Link, Redirect } from 'react-router-dom';

//---- Style
import "./Nav.css"

//---- Backend
import firebase from "../../backend/FirebaseService"

export default class Nav extends React.Component {
    state = {
<<<<<<< HEAD
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

=======
        search: ''
    }
>>>>>>> 4727d4bb2c1976ade9d8211017d9d0d2063b77ff
    render() {
        return (
            <div id="nav">
                <nav>
<<<<<<< HEAD
                    <input type="text" value={this.state.search} placeholder="Busque pelo produto aqui"
                        onChange={(e) => this.findProduct(e.target.value)} />
                        {
                            this.state.product["title"] !== null ? <Redirect to={{pathname: "/search", state: {search: this.state.product}}}></Redirect> : null
                        }
=======

                    <input type="text" value={this.state.search} placeholder="Busque pelo produto aqui"
                        onChange={(e) => this.setState({ search: e.target.value }) } />
                    {
                        this.state.search !== "" ?
                            <Redirect to={{
                                pathname: "/search", state: {
                                    search: this.state.search
                                },
                                search: this.state.search,
                            }} /> : null
                    }
>>>>>>> 4727d4bb2c1976ade9d8211017d9d0d2063b77ff
                    <Link to="/">Home</Link>
                    <Link to="/user" >User</Link>
                </nav>
            </div>
        )
    }
}