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
      blinkOpacity: 0,
      eyeOpacity: 1,
    }
  }

  componentWillMount () {
    this.props.dispatch(UserActions.hideNavbar());

  }

  componentDidMount() {
    var that = this;
    setTimeout(scrollLoop, 0);
    setTimeout(()=>{that.blink()}, 4020);

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
    var manage = document.querySelector("#manage");
    var view = document.querySelector("#viewStats");
    var welcome = document.querySelector("#welcome");

    function scrollLoop(e){
      var scroll = window.pageYOffset;
      setTranslate(0, scroll * -0.12, yellowCircle);
      setTranslate(0, scroll * .08, dl);
      setTranslate(0, scroll * .08, view);
      setTranslate(0, scroll * .06, manage);
      setTranslate(0, scroll * .15, welcome);
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
    
    var path = document.querySelector('#rabbitpath');
    var length = path.getTotalLength();
    // path.style.transition = path.style.WebkitTransition = 'none';

    path.style.strokeDashoffset = 15000;
    path.style.strokeDasharray = length/120 + ' ' + length/120;
    path.getBoundingClientRect();

    path.style.transition = path.style.WebkitTransition =
      'stroke-dashoffset 4s ease-in-out';

    path.style.strokeDashoffset = length/4 - 1950;
    path.style.strokeDasharray = length/2 + ' ' + length/2;

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
    blink() {
      var that = this
      var blinky = function () { return that.setState({ blinkOpacity: 1, eyeOpacity: 0}); };
      var eyes = function () { return that.setState({ blinkOpacity: 0, eyeOpacity: 1}); };
      setTimeout(blinky, 900);
      setTimeout(eyes, 1025);
      setTimeout(blinky, 1460);
      setTimeout(eyes, 1578);
    };

  render() {
    return (
      <div>
        <img id="yellowCircle" src="assets/circle.png"/>
        <img id="greenHex" src="assets/greenhexagon.png"/>
        <img id="greenHex2" src="assets/greenhexagon2.png"/>
        <img id="greenHex3" src="assets/greenhexagon1.png"/>
        <Button className="topLogin" color='teal' onClick={() => {AuthService.login(); }}>Login</Button>

        <div className="bgr" id="tealSq" style={{marginTop: -15}}> 
        <div className="childEl sq tealBG"></div>
        <div className="childEl">
          <h2 id="welcome">Welcome to Rabbit!</h2> 
          <div id="rabbit">
            <svg version="1.0" xmlns="http://www.w3.org/2000/svg" width="350.000000pt" height="350.000000pt" 
            viewBox="0 0 464.000000 464.000000" preserveAspectRatio="xMidYMid meet" >
              <g transform="translate(0.000000,464.000000) scale(0.100000,-0.100000)">
                <path id="rabbitpath" fill="none" stroke="#000000" strokeOpacity=".9" strokeWidth="155" d="M2774 4262 c-109 -60 -211 -208 -244 -357 -12 -55 -105 -776 -130
                -1015 -32 -308 -50 -356 -143 -405 -74 -39 -119 -31 -148 26 -18 37 -144 536
                -269 1069 -78 334 -97 400 -147 500 -47 94 -49 95 -113 127 -60 30 -70 32
                -130 26 -85 -8 -101 -15 -153 -62 -29 -27 -57 -70 -88 -133 l-44 -93 -3 -243
                c-3 -254 -3 -259 83 -1577 39 -594 92 -1280 111 -1429 l6 -49 63 5 c84 7 89
                11 82 67 -107 843 -109 867 -177 2201 -36 705 -37 971 -6 1045 31 73 86 115
                152 115 30 0 44 -7 75 -40 51 -54 70 -117 169 -575 106 -486 112 -512 185
                -775 97 -343 107 -363 201 -389 68 -19 115 -13 189 23 90 45 107 60 144 134
                38 76 57 182 111 622 79 652 96 764 142 883 43 116 81 157 143 157 108 0 150
                -96 201 -462 14 -100 27 -185 30 -190 5 -7 43 -461 79 -928 27 -348 55 -676
                95 -1120 22 -239 45 -493 51 -565 6 -71 13 -150 16 -174 l5 -44 63 5 c34 3 68
                9 75 13 14 9 14 10 -24 285 -14 102 -28 228 -31 280 -4 52 -15 176 -25 275
                -11 99 -37 430 -59 735 -81 1113 -107 1365 -172 1670 -30 138 -55 194 -132
                293 -58 75 -165 106 -233 69z" />
                <path className="rabbitEyes" fill="#000000" fillOpacity={this.state.eyeOpacity} d="M2587 1769 c-44 -26 -62 -131 -32 -189 18 -35 61 -70 87 -70 58 0
                108 61 108 132 -1 43 -33 113 -58 127 -26 14 -81 14 -105 0z"/>
                <path className="rabbitEyes" fill="#000000" fillOpacity={this.state.eyeOpacity} d="M1857 1739 c-44 -26 -62 -131 -32 -189 18 -35 61 -70 87 -70 58 0
                 108 61 108 132 -1 43 -33 113 -58 127 -26 14 -81 14 -105 0z"/>
                <path className="rabbitBlink" fillOpacity={this.state.blinkOpacity} d="M2531 1636 c-7 -8 -11 -27 -9 -43 l3 -28 100 -3 c123 -4 145 1 145
                31 0 46 -13 52 -123 55 -83 3 -106 1 -116 -12z"/>
                <path className="rabbitBlink" fillOpacity= {this.state.blinkOpacity} d="M1782 1628 c-7 -7 -12 -21 -12 -33 0 -39 18 -45 137 -45 111 0 113 0
                119 24 3 14 3 34 -1 45 -6 20 -14 21 -119 21 -74 0 -116 -4 -124 -12z"/>
              </g>
            </svg>
          </div>
        </div>
        </div>

        <div className="bgr" id="yellowSq" style={{marginTop: -12}}> 
        <div className="childEl sq yellowBG"> </div>
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

        <div className="bgr" id="blueSq" style={{marginTop: -160}}> 
        <div className="childEl sq blueBG"> </div>
        <div className="childEl" style={{width: '100vw'}}>
        <h2 id="manage">Manage profile on web app</h2>
          <img id="profDemo" src='assets/profilePage.gif' />
          <h3 className="profDescr first"> Create packs with your friends <br/></h3>
          <h3 className="profDescr"> Challenge packmates <br/> and create goals <br/></h3>
          <h3 className="profDescr"> Earn badges <br/></h3>
          <h3 className="profDescr"> View recent runs <br/></h3>
        </div>
        </div>

        <div className="bgr" id="salmonSq" style={{marginTop: 130}}> 
        <div className="childEl sq salmonBG"> </div>
        <div className="childEl" style={{width: '100vw'}}>
          <h2 id="viewStats"> View running statistics<br/><br/></h2>
          <img src="assets/analyticsPage.png" id="statsDemo"></img>

          <br/>
          <h3 className="statsDescr first"> Track progress <br/>and running habits<br/></h3>
          <h3 className="statsDescr"> Customized goals <br/> based on progress <br/></h3>

        </div>
        </div>

        <div className="bgr1" id="tealSq1" style={{marginTop: -270}}> 
        <img src="assets/teal1.png" className="childEl sq"/>
        <div className="childEl">
        </div>
        </div>
        <h2 id="getStarted">Get Started Now!</h2>
        <Button className="bottomLogin" onClick={() => {AuthService.login(); }}>Create an Account</Button>
        <a rel="external" href='https://itunes.apple.com/us/app/rabbitfitness/id1225338160?mt=8'>
        <img className="iosStore" src="assets/iosstore.png" />
        </a>
    </div>
    )
  }
}
