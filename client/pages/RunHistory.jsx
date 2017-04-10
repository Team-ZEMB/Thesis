import React from 'react';
import { connect } from 'react-redux';
import HistoryCard from '../components/HistoryCard';
import { Card, Grid } from 'semantic-ui-react'
import * as UserActions from '../actions';
import {GoogleMapLoader, GoogleMap, Marker} from "react-google-maps";


@connect((store) => {
  return {
    userdata: store.userdata,
  };
})

export default class RunHistory extends React.Component {
    constructor(props) {
    super(props);
    this.state = {
      center: { 
        lat: 33.9759, 
        lng: -118.3907 
      },
      zoom: 13,
    }
  }

  componentWillMount() {
    if (!!localStorage.getItem("profile")) {
      this.props.dispatch(UserActions.signIn());
    }
  }
  componentDidMount() {
    // create the map, marker and infoWindow after the component has
    // been rendered because we need to manipulate the DOM for Google =(
    window.map = new google.maps.Map(this.refs.mapCanvas, {
      zoom: this.state.zoom,
      center: this.state.center
    });
    window.markerBounds = new google.maps.LatLngBounds();
  }

  
  render() {
    var histArray = this.props.userdata.history.slice().reverse();



  return (
    <div>
      <div style={{width: '365px', float:'left'}}>
          {histArray.map(function(history, idx) {
            return <HistoryCard key={idx} hist={history} />;
          })}
      </div>
      <div style={{width: 'calc(100% - 365px)', float:'right'}}>
        <div className="map-view">
        <div className="google-map" ref="mapCanvas"></div>
        </div>
        </div>
      </div>
    )
  }
}
