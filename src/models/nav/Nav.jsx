//---- Packages
import React from 'react';
import { Link } from 'react-router-dom';

//---- Style
import "./Nav.css"

export default class Nav extends React.Component {
    render() {
        return (
            <div id="nav">
                <nav>
                    <input type="text" placeholder="Busque pelo produto aqui"
                        onChange={(e) => console.log(e.target.value)} />
                    <Link to="/">Home</Link>
                    {localStorage.getItem("email") != null ?
                        <Link to="/user" >User</Link>
                        :
                        <Link to="/login" >Login</Link>
                    }
                </nav>
            </div>
        )
    }
}