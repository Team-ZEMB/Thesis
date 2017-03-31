import React from 'react';
import { connect } from 'react-redux';
import * as UserActions from '../actions';

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
          <h1>Profile Page</h1>
          <img src={this.props.userdata.profileImage} alt="no profile picture" />
          <h3>Run history</h3>
          <h3>Analytics</h3>
          <h3>Packs</h3>
          <h3>Challenges</h3>
        </div>
        );
    }
  }
}

