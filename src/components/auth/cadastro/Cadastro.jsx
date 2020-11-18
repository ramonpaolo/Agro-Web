import React from 'react';

//---- Style
import "./Cadastro.css"

import firebase from "../../../backend/FirebaseService"
import { Link, Redirect } from 'react-router-dom';

export default class Cadastro extends React.Component {

    state = {
        email: "",
        password: "",
        error: ""
    }

    async cadastrar() {
        await firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).then((user) => {
            console.log("User: " + user.user.email)
            localStorage.setItem("email", user.user.email)
            localStorage.setItem("name", user.user.displayName)
            localStorage.setItem("emailVerified", user.user.emailVerified)
            localStorage.setItem("photoURL", user.user.photoURL)
            window.location.reload()
            return <Redirect to="/" ></Redirect>
        }).catch((error) => {
            console.log("Error: " + error)
            if (error = "Error: Password should be at least 6 characters") {
                this.setState({ error: "Senha menor que 6 caracteres" })
            }
        })
    }

    render() {
        if (localStorage.getItem("email") != null) {
            return <Redirect to="/user" />
        } else {
            return (
                <div id="cadastro">
                    <center>
                        <form>
                            <div>
                                <label>
                                    Email:
                        </label>
                                <input type="email" value={this.state.email}
                                    onChange={(e) => this.setState({ email: e.target.value })} />
                            </div>
                            <div>
                                <label>
                                    Password:
                        </label>
                                <input type="password" value={this.state.password}
                                    onChange={(p) => this.setState({ password: p.target.value })} />
                            </div>
                            <button type="button" onClick={async () => await this.cadastrar()}>Cadastro</button>
                        </form>
                        <br />
                        {this.state.error !== "" ? this.state.error : null}
                        <br />
                        <span>Já tem uma conta?</span> <Link to="/login">Logar-se</Link>
                    </center>
                </div>
            )
        }
    }
}