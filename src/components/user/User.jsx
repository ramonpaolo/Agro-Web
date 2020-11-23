import React from 'react';
import { Redirect } from 'react-router-dom';

import firebase from '../../backend/FirebaseService'

//---- Style
import "./User.css"

export default class User extends React.Component {
    state = { photoURL: null, name: "", file: {}, updateData: false }

    async componentDidMount() {
        await firebase.auth().currentUser.photoURL
        this.setState({ photoURL: localStorage.getItem("photoURL") })
        this.setState({ name: localStorage.getItem("name") })
    }

    async updateDatas() {
        const user = firebase.auth().currentUser
        await firebase.storage().ref("photoUsers").child(await user.uid).put(this.state.file)
        await firebase.storage().ref("photoUsers").child(await user.uid).getDownloadURL();
        user.updateProfile({ photoURL: await firebase.storage().ref("photoUsers").child(await user.uid).getDownloadURL(), displayName: this.state.name })
        localStorage.setItem("photoURL", await firebase.storage().ref("photoUsers").child(await user.uid).getDownloadURL())
        this.setState({updateData: true})
        window.location.reload()
    }

    async deslogar(){
        await firebase.auth().signOut()
        localStorage.clear()
        this.setState({updateData: true})
        window.location.reload()
    }

    render() {
        if (this.state.photoURL != null) {
            if (this.state.updateData) {
                return <Redirect to="/"></Redirect>
            } else {
                return (
                    <div id="user">
                        <center>
                            <figure id="image-user">
                                <img id="image-user" src={this.state.photoURL}
                                    alt="Image profile" />
                            </figure>
                            <h1 id="name">{this.state.name}</h1>
                            <div>
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
                                    <button type="button" onClick={async () => await this.updateDatas()}>Atualizar dados</button>
                                </form>
                            </div>
                        <div>
                            <h5 onClick={async () => await this.deslogar()}>Deslogar</h5>
                        </div>
                        </center>
                    </div>
                )
            }
        } else {
            return <h2>
                <center>
                    Carregando
                </center>
            </h2>
        }
    }
}