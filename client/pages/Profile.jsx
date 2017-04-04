import React from 'react';
import { connect } from 'react-redux';
import * as UserActions from '../actions';
import Analytics from './Analytics';
import StatsCard from '../components/StatsCard';
import PacksCard from '../components/PacksCard';

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
      console.log(this.props)

      return (
        <div>
          <img src={this.props.userdata.profileImage} alt="no profile picture" />
          <StatsCard />
          <PacksCard />
        </div>
        );
    }
  }
}

