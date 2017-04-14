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

  componentDidMount() {
    window.addEventListener("DOMContentLoaded", scrollLoop, false);

    var yellowCircle = document.querySelector("#yellowCircle");
    var blueSquare = document.querySelector("#blueSquare");
    var greenPent = document.querySelector("#greenPent");

    function scrollLoop(e){
      var scroll = window.pageYOffset;
      setTranslate(0, scroll * -0.2, yellowCircle);
      setTranslate(scroll *2, 0, blueSquare);
      setTranslate(0, scroll * 0.2, greenPent);
      requestAnimationFrame(scrollLoop)
    }

    function setTranslate(xPos, yPos, el) {
      el.style.transform = "translate3d(" + xPos + "px, " + yPos + "px, 0px)";
    }
  }

  render() {
    return (
      <div>
        <h2>Welcome to Rabbit!</h2>
        <Button color='teal' onClick={AuthService.login}>Login</Button>

  <div id="yellowCircle"></div>

  <div id="greenPent"></div>

        <Parallax className="parallaxImg" bgImage="assets/yt.png" strength={400}>  
        <Background strength={200}>      
          <div style={{ width: 800, height: 200}}>
            <img style={{margin: 'auto', height: 190, width: 680 }} src='assets/ys.png' />
          </div>
        </Background>
        </Parallax>
<div id="blueSquare"></div>
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
