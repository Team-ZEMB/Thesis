import React, { PropTypes as T } from 'react'
import AuthService from '../utils/AuthService'
import config from '../../environment';
import { Button } from 'semantic-ui-react';
import { Parallax, Background } from 'react-parallax';

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

        <Parallax className="parallaxImg" bgImage="assets/yt.png" strength={400}>  
        <Background strength={200}>      
          <div style={{ width: 800, height: 200}}>
            <img style={{margin: 'auto', height: 190, width: 680 }} src='assets/ys.png' />
          </div>
        </Background>
        </Parallax>

        <Parallax className="parallaxImg" bgImage="assets/sy.png" strength={700}>
        <Background>
          <div style={{ width: 600, height: 500, backgroundColor: 'red' }}></div>
          <div style={{ width: 900, height: 100, backgroundColor: 'orange' }}></div>
          </Background>
            <div style={{ width: 100, height: 100, backgroundColor: 'purple' }}></div>
        </Parallax>

        <Parallax className="parallaxImg2" bgImage="assets/ty.png" strength={500}>
        <Background>
          <div style={{ width: 500, height: 400, backgroundColor: 'blue' }}></div>
        </Background>
        </Parallax>

    </div>
    )
  }
}
