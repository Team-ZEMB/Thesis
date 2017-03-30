import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Router, Route, Link, browserHistory, IndexRoute } from 'react-router';
import thunk from 'redux-thunk';
import App from './components/App';
import Profile from './pages/Profile';
import Login from './pages/Login';

const createHistory = require('history').createHashHistory;

const hashHistory = createHistory();


ReactDOM.render(
    <Router history={hashHistory}>
      <Route path={'/'} component={App}>
        <IndexRoute component={Login} />
        <Route path="/login" component={Login} />
        <Route path="/profile" component={Profile} />
      </Route>
    </Router>
  , document.getElementById('app'));
