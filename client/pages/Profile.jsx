import React from 'react';
import { connect } from 'react-redux';

@connect((store) => {
  return {
    userdata: store.userdata,
  };
})


export default class Profile extends React.Component {
  render() {

    
    return (
      <div>
        <h1>Profile Page</h1>
        <img src="" alt="no profile picture" />
        <h3>Run history</h3>
        <h3>Analytics</h3>
        <h3>Packs</h3>
        <h3>Challenges</h3>
      </div>
    );
  }
}

