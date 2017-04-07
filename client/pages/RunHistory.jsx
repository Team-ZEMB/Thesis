import React from 'react';
import { connect } from 'react-redux';
import HistoryCard from '../components/HistoryCard';
import { Card } from 'semantic-ui-react'
import * as UserActions from '../actions';
import {GoogleMapLoader, GoogleMap, Marker} from "react-google-maps";


@connect((store) => {
  return {
    userdata: store.userdata,
  };
})

export default class RunHistory extends React.Component {

  componentWillMount() {
    if (!!localStorage.getItem("profile")) {
      this.props.dispatch(UserActions.signIn());
    }
  }
  
  render() {
    var histArray = this.props.userdata.history.slice().reverse();



  return (
    <div>
          
      <Card.Group itemsPerRow={2}>
        {histArray.map(function(history) {
          return <HistoryCard hist={history} />;
        })}
      </Card.Group>
      </div>
    )
  }
}
