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
      zoom: 15,
    }
  }

  componentWillMount() {
    if (!!localStorage.getItem("profile")) {
      if (!this.props.userdata.DBID) {  
        this.props.dispatch(UserActions.signIn());
      }
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
    if (!!localStorage.getItem("profile") === false){
      window.location.href= "/#/login"
      return false;
    } else {
    var histArray = this.props.userdata.history.slice().reverse();

  var showOnMap = (histItem) => {
    var tmpPath = [];
    JSON.parse(histItem.route).map((point) => {
      tmpPath.push({
        lat: point.latitude,
        lng: point.longitude
      })
    })
    window.map = new google.maps.Map(this.refs.mapCanvas, {
      zoom: 15,
      center: {
        lat: tmpPath[Math.floor(tmpPath.length/2)].lat,
        lng: tmpPath[Math.floor(tmpPath.length/2)].lng,
      },
    })

    let route = new google.maps.Polyline({
        map: window.map,
        path: tmpPath,
      })
    }
  }

  return (
    <div className="pageCont">
    <img className="yellowCircle" src="assets/circle.png"/>
    <div className="pageBG yellowBG" ></div>
      <div style={{width: '365px', height: '60vw', overflowY:'auto', float:'left'}}>
          {
            histArray.map(function(history, idx) {
              return <a key={idx} onClick={() => showOnMap(history)}><HistoryCard hist={history} /><br /></a>;
            })
          }
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
