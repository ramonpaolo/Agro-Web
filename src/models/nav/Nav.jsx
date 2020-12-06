//---- Packages
import React from 'react';
import { Link, Redirect } from 'react-router-dom';

//---- Style
import "./Nav.css"

export default class Nav extends React.Component {
    state = {
        search: ''
    }
    render() {
        return (
            <div id="nav">
                <nav>

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
                    <Link to="/">Home</Link>
                    <Link to="/user" >User</Link>
                </nav>
            </div>
        )
    }
}