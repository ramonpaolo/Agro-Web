//---- Packages
import React from 'react';
import { Link, Redirect } from 'react-router-dom';

//---- Style
import "./Login.css"

//---- Backend
import firebase from "../../../backend/FirebaseService"

export default class Login extends React.Component {

    state = {
        email: "",
        password: "",
        error: ""
    }

    async login() {
        await firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then(async (user) => {
            console.log("User: " + await user.user.email)
            localStorage.setItem("email", await user.user.email)
            localStorage.setItem("name", await user.user.displayName)
            localStorage.setItem("emailVerified", await user.user.emailVerified)
            localStorage.setItem("photoURL", await user.user.photoURL)
            window.location.reload()
        }).catch((error) => {
            console.log("Error: " + error)
            if (error === "Error: The email address is badly formatted.") {
                this.setState({ error: "O endereço de email digitado está mal formatado" })
            } else if (error === "Error: The password is invalid or the user does not have a password.") {
                this.setState({ error: "A senha digitada está errada" })
            }
        })
    }

    render() {
        if (localStorage.getItem("email") != null) {
            return <Redirect to="/" />
        } else {
            return (
                <div id="login">
                    <center>
                        <form>
                            <div>
                                <label>
                                    Email:
                        </label>
                                <input type="email" value={this.state.email} required
                                    onChange={(e) => this.setState({ email: e.target.value })} />
                            </div>
                            <div>
                                <label>
                                    Password:
                        </label>
                                <input type="password" value={this.state.password} required
                                    onChange={(p) => this.setState({ password: p.target.value })} />
                            </div>
                            <button type="button" onClick={async () => await this.login()}>Logar</button>
                        </form>
                        <br />
                        {this.state.error !== "" ? this.state.error : null}
                        <br />
                        <span>Não tem uma conta?</span> <Link to="/cadastro">Cadastre-se</Link>
                    </center>
                </div>
            )
        }
    }
}