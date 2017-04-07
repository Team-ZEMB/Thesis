import React, { PropTypes as T } from 'react'
import AuthService from '../utils/AuthService'
import config from '../../environment';


export default class Login extends React.Component {
  static propTypes = {
    location: T.object,
    auth: T.instanceOf(AuthService)
  }
  constructor() {
    super()
  }
  render() {
    return (
      <div>
        <h2>Login</h2>
        <button onClick={AuthService.login}>Login</button>
      </div>
    )
  }
}
