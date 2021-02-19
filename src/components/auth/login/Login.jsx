//---- Packages
import React, {Component} from 'react';
import { Link, Redirect } from 'react-router-dom';

//---- Style
import "./Login.css"

//---- Backend
import firebase from "../../../backend/FirebaseService"

export default class Login extends Component {

    state = {
        email: "",
        password: "",
        error: ""
    }

    showErrorMessage(error) {
        console.log(error)
        if (error === "The email address is badly formatted.") {
            this.setState({ error: "O endereço de email digitado está mal formatado" })
        } else if (error === "The password is invalid or the user does not have a password.") {
            this.setState({ error: "A senha digitada está errada" })
        } else if (error === "Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later.") {
            this.setState({ error: "Conta desativada temporariamente por várias tentativas sem sucesso de login" })
        }else if(error === "There is no user record corresponding to this identifier. The user may have been deleted."){
            this.setState({error: "Usuário não existente"})
        }
    }

    async setData(user) {
        localStorage.setItem("email", await user.email)
        localStorage.setItem("name", await user.displayName)
        localStorage.setItem("emailVerified", await user.emailVerified)
        localStorage.setItem("photoURL", await user.photoURL)
        localStorage.setItem("uid", await user.uid)
    }

    async login() {
        await firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then(async (user) => {
            console.log("User: " + await user.user.email)
            this.setData(user.user)
            window.location.reload()
        }).catch((error) => {
            this.showErrorMessage(error.message)
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
                        <strong>
                            {this.state.error !== "" ? this.state.error : null}</strong>
                        <br />
                        <span>Não tem uma conta?</span> <Link to="/cadastro">Cadastre-se</Link>
                    </center>
                </div>
            )
        }
    }
}