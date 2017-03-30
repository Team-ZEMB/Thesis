import React from 'react';
import { Route, IndexRedirect } from 'react-router';
// import Container from './Container'
// import Home from './pages/Profile'
import Login from './pages/Login';
import config from '../environment';

const auth = new AuthService(config.AUTH_ID, config.AUTH_CLIENT);

// validate authentication for private routes
const requireAuth = (nextState, replace) => {
  if (!auth.loggedIn()) {
    replace({ pathname: '/login' });
  }
};

export const createRoutes = () => (
  <Route path="/" component={App} auth={auth}>
    <IndexRedirect to="/profile" />
    <Route path="home" component={Home} onEnter={requireAuth} />
    <Route path="login" component={Login} />
  </Route>
  );

export default createRoutes;
