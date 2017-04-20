import React from 'react';
import { connect } from 'react-redux';
import * as UserActions from '../actions';
import Analytics from './Analytics';
import StatsCard from '../components/StatsCard';
import PacksCard from '../components/PacksCard';
import BadgesCard from '../components/BadgesCard';
import GoalsCard from '../components/GoalsCard';
import { Grid, Row, Col, Accordion, Icon, Card, Header } from 'semantic-ui-react';

@connect((store) => {
  return {
    userdata: store.userdata,
  };
})

export default class Profile extends React.Component {
  
  componentWillMount() {
    if (!!localStorage.getItem("profile")) {
      this.props.dispatch(UserActions.signIn());
    }
  }

  render() {
    if (!!localStorage.getItem("profile") === false){
      window.location.href= "/#/login"
      return false;
    } else {
      return (
        <div id="profileContent">
        <img className="yellowCircle" src="assets/circle.png"/>
        <img className="pageBG" src="assets/blue.png"/>
        <div className="pageCont">
          <StatsCard stats={this.props.userdata}/>  
          <PacksCard /> 
          <div id="clear"></div>
          <GoalsCard />
          <BadgesCard />
        </div>
        </div>
        );
    }
  }
}

