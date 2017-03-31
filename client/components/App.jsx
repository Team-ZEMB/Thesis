import React from 'react';
import { Route } from 'react-router';
import Profile from '../pages/Profile';
import Login from '../pages/Login';

export default class App extends React.Component {

  render() {
    return (
      <div>
        <Route exact path="/" component={Profile} />
        <Route path="/profile" component={Profile} />
        <Route path="/login" component={Login} />
      </div>
    );
  }
}

