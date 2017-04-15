import React, { PropTypes as T } from 'react'
import AuthService from '../utils/AuthService'
import config from '../../environment';
import { Button } from 'semantic-ui-react';
import { Parallax, Background } from 'react-parallax';
import { connect } from 'react-redux';
import * as UserActions from '../actions';


@connect((store) => {
  return {
    userdata: store.userdata,
  };
})

export default class Login extends React.Component {
  static propTypes = {
    location: T.object,
    auth: T.instanceOf(AuthService)
  }
  constructor() {
    super()
  }
  componentWillMount () {
    this.props.dispatch(UserActions.hideNavbar());
  }

  componentDidMount() {
    window.addEventListener("DOMContentLoaded", scrollLoop, false);

    var yellowCircle = document.querySelector("#yellowCircle");
    var blueSquare = document.querySelector("#blueSquare");
    var greenPent = document.querySelector("#greenPent");
    var tealSq = document.querySelector("#tealSq");

    function scrollLoop(e){
      var scroll = window.pageYOffset;
      setTranslate(0, scroll * -0.12, yellowCircle);
      setTranslate(scroll, 0, blueSquare);
      setTranslate(0, scroll * 0.2, greenPent);
      setTranslate(0, scroll * -.9, tealSq);
      requestAnimationFrame(scrollLoop)
    }

    function setTranslate(xPos, yPos, el) {
      el.style.transform = "translate3d(" + xPos + "px, " + yPos + "px, 0px)";
    }

  }

  render() {
    return (
      <div>
        <img id="yellowCircle" src="assets/circle.png"/>
        <img id="greenPent" src="assets/greenpentagon.svg"/>
        <Button id="loginButton" color='teal' onClick={() => {AuthService.login(); }}>Login</Button>
        <div className="bg" id="tealSq"> 
        <img src="assets/teal.png" />
        <img id="rabbit" style={{maxHeight: 200}} src="assets/rabbit.png"></img>
        <h2>Welcome to Rabbit!</h2> 
        </div>


        <div id="blueSquare">hi there!</div>
                <Parallax className="parallaxImg" bgImage="assets/yellow.png" strength={300}>
        <Background>

        </Background>
        </Parallax>
        <Parallax className="parallaxImg" bgImage="assets/blue.png" strength={300}>
        <Background>
            <img style={{margin: 'auto', height: 690, width: 300 }} src='assets/teal.png' />
          <div style={{ width: 900, height: 100, backgroundColor: 'orange' }}></div>
          </Background>
        </Parallax>

        <Parallax className="parallaxImg" bgImage="assets/sy.png" strength={300}>
        <Background>

        </Background>
        </Parallax>

        <Parallax className="parallaxImg" bgImage="assets/teal.png" strength={300}>
        <Background>

        </Background>
        </Parallax>

    </div>
    )
  }
}
