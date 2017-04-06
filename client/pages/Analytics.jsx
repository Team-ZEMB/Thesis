import React from 'react';
import { connect } from 'react-redux';
import * as UserActions from '../actions';
import regression from 'regression';
import LineChart from '../components/LineChart';
import BubbleChart from '../components/BubbleChart';
import { Chart } from 'chart.js'

Chart.defaults.global.legend.display = false;

@connect((store) => {
  return {
    userdata: store.userdata,
  };
})

class Analytics extends React.Component {
    constructor() {
        super()
    }
  componentWillMount() { 
    if (!!localStorage.getItem("profile")) {
      this.props.dispatch(UserActions.signIn());
    }
  } 

    render() {
        return (
            <div>
                <BubbleChart />
                <LineChart />
            </div>
        )
    }
}

export default Analytics
