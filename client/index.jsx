import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Router, Route, Link, IndexRoute } from 'react-router';
import thunk from 'redux-thunk';
import App from './components/App';
//import Profile from './pages/Profile';
import Login from './pages/Login';
import makeRoutes from './routes.jsx'

const createHistory = require('history').createHashHistory;

const hashHistory = createHistory();


ReactDOM.render(
  <Provider store={createStore(reducers, applyMiddleware(thunk))} >
    <Router history={hashHistory} routes={makeRoutes()} />
  </Provider>
  , document.getElementById('app'));
