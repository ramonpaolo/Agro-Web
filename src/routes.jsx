//---- Packages
import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

//---- Screens
import Home from './components/home/Home';
import User from './components/user/User';
import Login from './components/auth/login/Login';
import Cadastro from './components/auth/cadastro/Cadastro';
import Product from './components/produto/Produto';

//---- Models
import Nav from './models/nav/Nav';
import Footer from './models/footer/Footer';

export default class Routes extends React.Component {
  render() {
    return (
      <div>
        <center>
        <BrowserRouter>
        {localStorage.getItem('email') != null ?
          <Nav /> : null }
          {localStorage.getItem('email') != null ?
            <Switch>
              <Route exact path='/' component={Home} />
              <Route exact path='/user' component={User} />
              <Route exact path='/login' component={Login} />
              <Route exact path='/cadastro' component={Cadastro} />
              <Route exact path='/produto' component={Product} />
            </Switch> : <Switch>
              <Route exact path='/' component={Login} />
              <Route path='/cadastro' component={Cadastro} />
            </Switch>}
        </BrowserRouter>
        <Footer />
        </center>
      </div>
    );
  }
}