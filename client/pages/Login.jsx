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
    var greenHex = document.querySelector("#greenHex");
    var tealSq = document.querySelector("#tealSq");
    var yellowSq = document.querySelector("#yellowSq");
    var blueSq = document.querySelector("#blueSq");
    var tealSq1 = document.querySelector("#tealSq1");
    var salmonSq = document.querySelector("#salmonSq");
    var rabbit = document.querySelector("#rabbit");
    var dl = document.querySelector("#dl");
    
    this.setState({
      yellowMargin: -10,
      blueMargin: -160,
      salmonMargin: 100,
      tealMargin: -270
    });

    function scrollLoop(e){
      var scroll = window.pageYOffset;
      setTranslate(0, scroll * -0.12, yellowCircle);
      rotate(0, scroll * 0.1, greenHex);
      // grow(scroll, dl);
      setTranslate(0, scroll * -.1, tealSq);
      setTranslate(0, scroll * -.2, yellowSq);
      setTranslate(0, scroll * -.1, blueSq);
      setTranslate(0, scroll * -.2, salmonSq);
      setTranslate(0, scroll * -.1, tealSq1);
      setTranslate(0, scroll * .4, rabbit);
      requestAnimationFrame(scrollLoop);
    }

    function setTranslate(xPos, yPos, el) {
      el.style.transform = 'translate3d(' + xPos + 'px, ' + yPos + 'px, 0px)';
    }

    function rotate(xPos, yPos, el) {
      if (xPos === 0) {
        el.style.transform = 'translate3d(' + xPos + 'px, ' + yPos + 'px, 0px) rotate(' + yPos/2 +'deg)';
      } else {
        el.style.transform = 'translate3d(' + xPos + 'px, ' + yPos + 'px, 0px) rotate(' + xPos/3 +'deg)';
      }
    }

    // function grow (scroll, el) {
    //   var rect = el.getBoundingClientRect();
    //   console.log('TOP: ', rect.top, rect.right, rect.bottom, rect.left);
    //   if (rect.top > 5) {
    //   el.style.transform = 'scale(' + 1.2 + ',' + 1.2 + ')';
    // }
    // }

  }

  render() {
    return (
      <div>
        <img id="yellowCircle" src="assets/circle.png"/>
        <img id="greenHex" src="assets/greenhexagon.png"/>
        <Button className="topLogin" color='teal' onClick={() => {AuthService.login(); }}>Login</Button>

        <div className="bgr" id="tealSq"> 
        <img src="assets/teal.png" className="childEl sq"/>
        <div className="childEl">
          <h2 id="welcome">Welcome to Rabbit!</h2> 
          <img id="rabbit" style={{maxHeight: 400}} src="assets/rabbit.png"></img>
        </div>
        </div>

        <div className="bgr" id="yellowSq" style={{marginTop: this.state.yellowMargin}}> 
        <img src="assets/yellow.png" className="childEl sq"/>
        <div className="childEl" style={{width: '90vw'}}>
          <img src="assets/appDemo.gif" id="appDemo"></img>
          <h2 id="dl"> Download running <br/>companion<br/><br/></h2>
          <h3 className="description" id="tracks"> Save running time <br/>and route<br/></h3>
          <h3 className="description"> Compete for best three-mile time <br/> alone or with your pack <br/></h3>
        </div>
        </div>

        <div className="bgr" id="blueSq" style={{marginTop: this.state.blueMargin}}> 
        <img src="assets/blue.png" className="childEl sq"/>
        <div className="childEl">
          <img style={{margin: 'center', height: 690, width: 200 }} src='assets/teal.png' />
        </div>
        </div>

        <div className="bgr" id="salmonSq" style={{marginTop: this.state.salmonMargin}}> 
        <img src="assets/sy.png" className="childEl sq"/>
        <div className="childEl">
        </div>
        </div>

        <div className="bgr1" id="tealSq1" style={{marginTop: this.state.tealMargin}}> 
        <img src="assets/teal1.png" className="childEl"/>
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
