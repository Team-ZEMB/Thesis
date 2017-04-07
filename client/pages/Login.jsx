import React, { PropTypes as T } from 'react'
import AuthService from '../utils/AuthService'
import config from '../../environment';
import { Button } from 'semantic-ui-react';

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
        <h2>Welcome to Rabbit!</h2>
        <Button color='teal' onClick={AuthService.login}>Login</Button>
      </div>
    )
  }
}
