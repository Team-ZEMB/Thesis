import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Router, Route, Link, browserHistory, IndexRoute } from 'react-router';
import thunk from 'redux-thunk';
import App from './components/App';
//import Profile from './pages/Profile';
import Login from './pages/Login';

const createHistory = require('history').createHashHistory;

const hashHistory = createHistory();


ReactDOM.render(
  <div>
    <Login />
  </div>
  , document.getElementById('app'));
