import React from 'react';
import { connect } from 'react-redux';

@connect((store) => {
  return {
    userdata: store.userdata,
  };
})

class BadgesCard extends React.Component {
  constructor(props) {
    super();
  }
  render() {
    return (
      <div>
      {
        this.props.userdata.badges.map((badge, idx) => {
       return <div key={idx} className="imgContainer"><img src={'assets/' + badge.image} className="badgeImg"/>
         <p>{badge.description}</p>
       </div>
      })}
      </div>
    );
  }
}

export default BadgesCard;
