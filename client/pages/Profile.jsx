import React from 'react';
import { connect } from 'react-redux';
import * as UserActions from '../actions';
import MyChart from '../components/MyChart';
import regression from 'regression';

var xArray = ["Run 1", "Run 2", "Run 3", "Run 4", "Run 5"]
var yArray = [10, 11, 8, 9, 7]

var data = {
    labels: xArray,
    datasets: [
        {
            label: "My First dataset",
            fill: false,
            lineTension: 0.1,
            backgroundColor: "rgba(75,192,192,0.4)",
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

