import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reducers from './reducers/index';
import { Router, Route } from 'react-router';
import thunk from 'redux-thunk';
import App from './components/App';
<<<<<<< HEAD
=======
import Profile from './pages/Profile';
import Login from './pages/Login';
import createRoutes from './routes.jsx'
import AuthService from './utils/AuthService'
import config from '../environment'
>>>>>>> Auth restructuring - scrapped

const createHistory = require('history').createHashHistory;

const hashHistory = createHistory();

<<<<<<< HEAD
// validate authentication for private routes

ReactDOM.render(
  <Provider store={createStore(reducers, applyMiddleware(thunk))} >
    <Router history={hashHistory}>
      <Route path={'/'} component={App} />
    </Router>
  </Provider>
=======
const auth = new AuthService(config.AUTH_ID, config.AUTH_CLIENT);

ReactDOM.render(
  <div>
    <Login auth={auth}/>
  </div>
>>>>>>> Auth restructuring - scrapped
  , document.getElementById('app'));

  // Provider store={createStore(reducers, applyMiddleware(thunk))} >
  //   <Router history={hashHistory} routes={createRoutes()} />
  // </Provider>
