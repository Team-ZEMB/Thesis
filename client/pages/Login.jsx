import React, { PropTypes as T } from 'react'
import AuthService from '../utils/AuthService'
import config from '../../environment';


export default class Login extends React.Component {
  static propTypes = {
    location: T.object,
    auth: T.instanceOf(AuthService)
  }

  render() {
    this.auth = new AuthService(config.AUTH_ID, config.AUTH_CLIENT);
    return (
      <div>
        <h2>Login</h2>
        <button onClick={this.auth.login}>Login</button>
      </div>
    )
  }
}
