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
    this.state = {
      yellowMargin: 0,
      blueMargin: 0,
      salmonMargin: 0,
      tealMargin: 0
    }
  }

  componentWillMount () {
    this.props.dispatch(UserActions.hideNavbar());

  }

  componentDidMount() {

    setTimeout(scrollLoop, 0);

    var yellowCircle = document.querySelector("#yellowCircle");
    var blueSquare = document.querySelector("#blueSquare");
    var greenHex = document.querySelector("#greenHex");
    var tealSq = document.querySelector("#tealSq");
    var yellowSq = document.querySelector("#yellowSq");
    var blueSq = document.querySelector("#blueSq");
    var tealSq1 = document.querySelector("#tealSq1");
    var salmonSq = document.querySelector("#salmonSq");
    var rabbit = document.querySelector("#rabbit");
    
    this.setState({
      yellowMargin: 10,
      blueMargin: -160,
      salmonMargin: 140,
      tealMargin: -280
    });

    function scrollLoop(e){
      var scroll = window.pageYOffset;
      setTranslate(0, scroll * -0.12, yellowCircle);
      // setTranslate(scroll, 0, blueSquare);
      rotate(scroll, 0, blueSquare);
      // setTranslate(0, scroll * 0.2, greenHex);
      rotate(0, scroll * 0.21, greenHex);
      setTranslate(0, scroll * -.1, tealSq);
      setTranslate(0, scroll * -.2, yellowSq);
      setTranslate(0, scroll * -.1, blueSq);
      setTranslate(0, scroll * -.2, salmonSq);
      setTranslate(0, scroll * -.1, tealSq1);
      setTranslate(0, scroll * .7, rabbit);
      requestAnimationFrame(scrollLoop);
    }

    function setTranslate(xPos, yPos, el) {
      el.style.transform = 'translate3d(' + xPos + 'px, ' + yPos + 'px, 0px)';
    }

    function rotate(xPos, yPos, el) {
      if (xPos === 0) {
        el.style.transform = 'translate3d(' + xPos + 'px, ' + yPos + 'px, 0px) rotate(' + yPos/4 +'deg)';
      } else {
        el.style.transform = 'translate3d(' + xPos + 'px, ' + yPos + 'px, 0px) rotate(' + xPos/3 +'deg)';
      }
    }
  }

  render() {
    return (
      <div>
        <img id="yellowCircle" src="assets/circle.png"/>
        <img id="greenHex" src="assets/greenhexagon.png"/>
        <Button className="topLogin" color='teal' onClick={() => {AuthService.login(); }}>Login</Button>

        <div className="bgr" id="tealSq"> 
        <img src="assets/teal.png" className="childEl"/>
        <div className="childEl">
          <h2>Welcome to Rabbit!</h2> 
          <img id="rabbit" style={{maxHeight: 200}} src="assets/rabbit.png"></img>
        </div>
        </div>

        <div id="blueSquare">hi there!</div>
        <div className="bgr" id="yellowSq" style={{marginTop: this.state.yellowMargin}}> 
        <img src="assets/yellow.png" className="childEl"/>
        <div className="childEl">
          <h2>hihi!</h2> 
        </div>
        </div>

        <div className="bgr" id="blueSq" style={{marginTop: this.state.blueMargin}}> 
        <img src="assets/blue.png" className="childEl"/>
        <div className="childEl">
          <img style={{margin: 'center', height: 690, width: 200 }} src='assets/teal.png' />
        </div>
        </div>

        <div className="bgr" id="salmonSq" style={{marginTop: this.state.salmonMargin}}> 
        <img src="assets/sy.png" className="childEl"/>
        <div className="childEl">
        </div>
        </div>

        <div className="bgr1" id="tealSq1" style={{marginTop: this.state.tealMargin}}> 
        <img src="assets/teal.png" className="childEl"/>
        <div className="childEl">
        </div>
        </div>
        <h2 id="getStarted">Get Started Now!</h2>
        <Button className="bottomLogin" onClick={() => {AuthService.login(); }}>Create an Account</Button>
        <a rel="external" href='https://www.youtube.com/watch?v=rEGOihjqO9w'>
        <img className="iosStore" src="assets/iosstore.png" />
        </a>
    </div>
    )
  }
}
