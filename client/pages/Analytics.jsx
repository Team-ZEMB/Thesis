import React from 'react';
import { connect } from 'react-redux';
import * as UserActions from '../actions';
import regression from 'regression';
import LineChart from '../components/LineChart';
import BubbleChart from '../components/BubbleChart';
import { Chart } from 'chart.js'
import { Card, Grid } from 'semantic-ui-react';
import axios from 'axios';

Chart.defaults.global.legend.display = false;

@connect((store) => {
  return {
    userdata: store.userdata,
  };
})

class Analytics extends React.Component {
    constructor() {
        super()
        this.state = {
            value: ''
        }
    
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    handleSubmit(value) {
        this.setGoal(this.state.value);
        //success
    }

  componentWillMount() { 
    if (!!localStorage.getItem("profile")) {
      this.props.dispatch(UserActions.signIn());
    }
  } 
      setGoal(miles) {
        //miles is the problem
        var input = [[miles, null]];

        var hist = this.props.userdata.history;

        for (var k = 0; k < hist.length; k++) {
            var tuple = [];
            var minutes = this.props.userdata.history[k].duration / 60;
            tuple.push(this.props.userdata.history[k].distance);
            tuple.push(minutes);
            input.push(tuple);
        }

        var result = regression('linear', input);

        var expectedTime = Math.ceil(result.points[0][1]);

        // var easy = expectedTime;
        // var medium = expectedTime * 0.85;
        // var hard = expectedTime * 0.60;

        var converter = function secondsToHms(d) {
            d = Number(d);
            var h = Math.floor(d / 3600);
            var m = Math.floor(d % 3600 / 60);
            var s = Math.floor(d % 3600 % 60);

            var hDisplay = h > 0 ? h + (h == 1 ? " hour, " : " hours, ") : "";
            var mDisplay = m > 0 ? m + (m == 1 ? " minute, " : " minutes, ") : "";
            var sDisplay = s > 0 ? s + (s == 1 ? " second" : " seconds") : "";
            return hDisplay + mDisplay + sDisplay; 
        }
        var duration = converter(expectedTime*60)


        var goalInput = "Run " + miles + " miles in " + duration;

        this.addGoal(this.props.userdata.DBID, goalInput);
    }

    addGoal(user, input) {
        var that = this;
        if (input.length > 1) {
            axios.post('/api/goals', {
                UserId: user,
                description: input,
                status: 'generated'
            })
            .then((res) => {
                console.log('Generated goal: ', input)
            })
            .catch(err => console.log(err))
        }
    }

    render() {
        return (
            <div>
                <Grid>
                  <Grid.Row>
                  <Grid.Column width={1}>
                  </Grid.Column>
                  <Grid.Column width={12}>
              <Card.Group itemsPerRow={1}>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Set a goal (miles): 
                        <input type="number" name="mileGoal" value={this.state.value} onChange={this.handleChange}/>
                    </label>
                    <input type="submit" value="Submit" />
                </form>
                 </Card.Group>
                </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                  <Grid.Column width={1}>
                  </Grid.Column>
                  <Grid.Column width={12}>
              <Card.Group itemsPerRow={1}>
                <BubbleChart />
                </Card.Group>
                </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                  <Grid.Column width={1}>
                  </Grid.Column>
                <Grid.Column width={12}>
                <Card.Group itemsPerRow={1}>
                <LineChart />
                </Card.Group>
                </Grid.Column>
                </Grid.Row>
                </Grid>
            </div>
        )
    }
}

export default Analytics
