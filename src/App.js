import React from 'react';
import './App.css';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom"
import AppNavbar from "./js/components/layout/AppNavbar"
import Dashboard from "./js/components/layout/Dashboard"
import { UserIsAuthenticated , UserIsNotAuthenticated} from "./js/helpers/auth"
import {Provider} from "react-redux"
import store from "./js/store/Store"
import AddClient  from "./js/components/clients/AddClient"
import EditClient from './js/components/clients/AddClient';
import ClientDetails from "./js/components/clients/ClientDetails"
import Login from './js/components/auth/Login';
import Settings from "./js/components/settings/Settings"
import Registration from "./js/components/auth/Registration"


function App() {
  return (
    <Provider store={store}>
      <Router>
      <div>
        <AppNavbar />
        <div className="container">
            <Switch>
              <Route exact path="/" component={UserIsAuthenticated(Dashboard)} />
              <Route exact path = "/client/add" component = {UserIsAuthenticated(AddClient)} />
              <Route exact path = "client/:id" component = {UserIsAuthenticated(ClientDetails)} />
              <Route exact path= 'client/edit/:id' component= {UserIsAuthenticated(EditClient)}/>
              <Route exact path = '/login' component={UserIsNotAuthenticated(Login)}/>
              <Route exact path ="./settings" component={UserIsAuthenticated(Settings)}/>
              <Route exact path ="/registration" component={UserIsNotAuthenticated(Registration)}/>
            </Switch>
        </div>
      </div>
      </Router>
    </Provider>
  );
}

export default App;
