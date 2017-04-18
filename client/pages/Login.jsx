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
    var greenHex1 = document.querySelector("#greenHex");
    var greenHex2 = document.querySelector("#greenHex2")
    var greenHex3 = document.querySelector("#greenHex3")
    var tealSq = document.querySelector("#tealSq");
    var yellowSq = document.querySelector("#yellowSq");
    var blueSq = document.querySelector("#blueSq");
    var tealSq1 = document.querySelector("#tealSq1");
    var salmonSq = document.querySelector("#salmonSq");
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
      setTranslate(0, scroll * .08, dl);
      setTranslate(0, scroll * -.1, tealSq);
      setTranslate(0, scroll * -.2, yellowSq);
      setTranslate(0, scroll * -.1, blueSq);
      setTranslate(0, scroll * -.2, salmonSq);
      setTranslate(0, scroll * -.1, tealSq1);
      requestAnimationFrame(scrollLoop);
    }

    function setTranslate(xPos, yPos, el) {
      el.style.transform = 'translate3d(' + xPos + 'px, ' + yPos + 'px, 0px)';
    }
    

    setTimeout(rotate(0,0,0,greenHex1, 'left', 'down'),0);
    setTimeout(rotate(0,0,0,greenHex2, 'right', 'up'),0);
    setTimeout(rotate(0,0,0,greenHex3, 'right', 'down'),0);

    function rotate(xPos, yPos, rPos, el, dirx, diry) {
      el.style.transform = 'translate3d(' + xPos + 'px, ' + yPos + 'px, 0px) rotate(' + rPos +'deg)';
      
      var rect = el.getBoundingClientRect();

      if (rect.left < -100 && dirx === 'left') {
        dirx = 'right';
        var x = xPos + 0.7;
      } else if (dirx === 'left') {
        var x = xPos - 0.7;
      } else if (rect.left > 800 && dirx === 'right') {
        dirx = 'left';
        var x = xPos - 0.7;
      } else if (dirx === 'right') {
        var x = xPos + 0.7;
      } 
      if (diry === 'down' && rect.bottom > 780) {
        diry = 'up';
        var y = yPos - 0.7;
      } else if (diry === 'down') {
        var y = yPos + 0.7;
      } else if (diry === 'up' && rect.top < -100) {
        diry = 'down';
        var y = yPos + 0.7;
      } else if (diry === 'up') {
        var y = yPos - 0.7;
      }
      setTimeout(()=> {rotate(x, y, rPos+0.2, el, dirx, diry)}, 30);

    }
  }

  render() {
    return (
      <div>
        <img id="yellowCircle" src="assets/circle.png"/>
        <img id="greenHex" src="assets/greenhexagon.png"/>
        <img id="greenHex2" src="assets/greenhexagon2.png"/>
        <img id="greenHex3" src="assets/greenhexagon1.png"/>
        <Button className="topLogin" color='teal' onClick={() => {AuthService.login(); }}>Login</Button>

        <div className="bgr" id="tealSq" style={{marginTop: -15}}> 
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
          <h2 id="dl"> Download running <br/>companion<br/></h2>
          <div id="saveCompete">
          <br/>
          <h3 className="appDescr first"> Save running time <br/>and route<br/></h3>
          <h3 className="appDescr"> Compete for best three-mile time <br/> alone or with your pack <br/></h3>
          </div>
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
        <img src="assets/teal1.png" className="childEl sq"/>
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
