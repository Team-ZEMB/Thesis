import React from 'react';
import { connect } from 'react-redux';
import * as UserActions from '../actions';
import axios from 'axios';
import TopPacksCard from '../components/TopPacksCard';
import TopSoloCard from '../components/TopSoloCard';

@connect((store) => {
  return {
    userdata: store.userdata
  };
})

export default class Leaderboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  componentWillMount() {
    if (!!localStorage.getItem("profile")) {
      this.props.dispatch(UserActions.signIn());
    }
  }

  render() {
    return (
      <div className="pageCont">
      <img className="yellowCircle" src="assets/circle.png"/>
      <img className="pageBG" src="assets/teal.png"/>
      <TopPacksCard />
      <TopSoloCard />
      </div>
    )
  }
}
