//---- Packages
import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

//---- Screens
import Home from './components/home/Home';
import User from './components/user/User';
import Login from './components/auth/login/Login';
import Cadastro from './components/auth/cadastro/Cadastro';

//---- Models
import Nav from './models/nav/Nav';
import Footer from './models/footer/Footer';

export default class Routes extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Nav />
        {localStorage.getItem('email') != null ?
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/user' component={User} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/cadastro' component={Cadastro} />
          </Switch> : <Route exact path='/' component={Login} />}
        <Footer />
      </BrowserRouter>
    );
  }
}