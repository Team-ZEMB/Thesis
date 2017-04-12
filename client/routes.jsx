// import React from 'react';
// import { Route, IndexRedirect } from 'react-router';
// import Profile from './pages/Profile'
// import Login from './pages/Login';
// import config from '../environment';
// import App from './components/App'
// import AuthService from './utils/AuthService'

// const auth = new AuthService(config.AUTH_ID, config.AUTH_CLIENT, options);

// // validate authentication for private routes
// const requireAuth = (nextState, replace) => {
//   if (!auth.loggedIn()) {
//     replace({ pathname: '/login' });
//   }
// };

const createRoutes = () => (
  <Route path="/" component={App} auth={auth}>
    <Route exact path="/" component={Profile} />
    <Route path="/profile" component={Profile} onEnter={requireAuth} />
    <Route path="/login" component={Login} auth={auth}/>
    <Route path="/leaderboard" component={Leaderboard} auth={auth}/>
  </Route>
  );

// export default createRoutes;
