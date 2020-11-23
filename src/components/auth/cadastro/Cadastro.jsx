//---- Packages
import React from 'react';
import { Link, Redirect } from 'react-router-dom';

//---- Style
import "./Cadastro.css"

//---- Backend
import firebase from "../../../backend/FirebaseService"

export default class Cadastro extends React.Component {

    state = {
        email: "",
        password: "",
        name: "",
        file: {},
        error: ""
    }

    async saveLocalStorage(user) {
        localStorage.setItem("photoURL", await firebase.storage().ref("photoUsers").child(user.user.uid).getDownloadURL())
        localStorage.setItem("email", user.user.email)
        localStorage.setItem("name", this.state.name)
        localStorage.setItem("emailVerified", user.user.emailVerified)
    }


    async cadastrar() {
        await firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).then(async (user) => {
            await firebase.storage().ref("photoUsers").child(await user.user.uid).put(this.state.file)
            await user.user.updateProfile({
                displayName: this.state.name,
                photoURL: await firebase.storage().ref("photoUsers").child(user.user.uid).getDownloadURL()
            })

            await this.saveLocalStorage(user);
            window.location.reload()
        }).catch((error) => {
            if (error = "Error: Password should be at least 6 characters") {
                this.setState({ error: "Senha menor que 6 caracteres" })
            } else {
                console.log("Error: " + error)
            }
        })
    }

    render() {
        if (localStorage.getItem("email") != null) {
            return <Redirect to="/" />
        } else {
            return (
                <div id="cadastro">
                    <center>
                        <form>
                            <div>
                                <div>
                                    <label>
                                        Foto de Perfil:
                                <input type="file" required
                                            onChange={(f) => this.setState({ file: f.target.files[0] })} />
                                    </label>
                                </div>
                                <label>
                                    Nome:
                                <input type="text" value={this.state.name} required
                                        onChange={(n) => this.setState({ name: n.target.value })} />
                                </label>
                            </div>
                            <div>
                                <label>
                                    Email:
                                <input type="email" value={this.state.email} required
                                        onChange={(e) => this.setState({ email: e.target.value })} />
                                </label>
                            </div>
                            <div>
                                <label>
                                    Password:
                                <input type="password" value={this.state.password} required
                                        onChange={(p) => this.setState({ password: p.target.value })} />
                                </label>
                            </div>
                            <button type="button" onClick={async () => await this.cadastrar()}>Cadastro</button>
                        </form>
                        <br />
                        {this.state.error !== "" ? this.state.error : null}
                        <br />
                        <span>Já tem uma conta?</span> <Link to="/">Logar-se</Link>
                    </center>
                </div>
            )
        }
    }
}