import React from 'react';
import { connect } from 'react-redux';
import * as UserActions from '../actions';
import MyChart from '../components/MyChart';
import regression from 'regression';
import moment from 'moment';

//trying distance in miles / time in minutes
var input = [[1,4],[1.5,null],[2,26],[0.5,2],[2.5, null],[3, null]];


var sorted = input.sort(function(a,b) {
  return a[0] - b[0];
});

var result = regression('linear', sorted);

var unzip = function(array, index) {
  var output = [];
  for (var i = 0; i < array.length; i++) {
    output.push(array[i][index]);
  }
  console.log("output: ", output)
  return output;
}

var xArray = unzip(result.points, 0);
var yArray = unzip(result.points, 1);

var data = {
    labels: xArray,
    datasets: [
        {
            label: "Run time regression",
            fill: true,
            xAxisID: "Miles",
            yAxisID: "Minutes",
            lineTension: 0.9,
            backgroundColor: "rgba(63, 63, 191, 1)",
            borderColor: "rgba(75,192,192,1)",
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: "rgba(75,192,192,1)",
            pointBackgroundColor: "#fff",
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "rgba(75,192,192,1)",
            pointHoverBorderColor: "rgba(220,220,220,1)",
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: yArray,
            spanGaps: false,
        }
    ]
};

var options;

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
      console.log("data", data)

      return (
        <div>
          <h1>Profile Page</h1>
          <img src={this.props.userdata.profileImage} alt="no profile picture" />
          <h3>Run history</h3>
          <h3>Analytics</h3>
          <MyChart data={data} options={options}/>
          <h3>Packs</h3>
          <h3>Challenges</h3>
        </div>
        );
    }
  }
}

