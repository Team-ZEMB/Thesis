import React from 'react';
import { connect } from 'react-redux';
import * as UserActions from '../actions';
import regression from 'regression';
import LineChart from '../components/LineChart';
import BubbleChart from '../components/BubbleChart';
import WeeklyChart from '../components/WeeklyChart';
import { Chart } from 'chart.js'
import { Button, Card, Grid, Message, Feed, Segment, Dimmer, Loader } from 'semantic-ui-react';
import axios from 'axios';
import moment from 'moment';

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
            value: '',
            error: '',
        }
    
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value});
        this.setState({error: ''});
    }

    handleSubmit(value) {
      var miles = parseInt(this.state.value);
      if (this.props.userdata.history.length > 0 && miles) {
        this.setGoal(miles);
      } else if (this.props.userdata.history.length <= 0) {
         this.setState({error: "You must complete at least one run to get a customized goal."});
      } else if (!miles) {
         this.setState({error: "Unable to process request. Please enter a whole number."});
      }
    }

    componentWillMount() { 
      if (!!localStorage.getItem("profile")) {
          if (!this.props.userdata.DBID) {
              this.props.dispatch(UserActions.signIn());
          }
      }
    } 

    setGoal(miles) {
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
        var duration = this.converter(expectedTime*60);
        let mi;
        miles == 1 ? mi = ' mile' : mi = ' miles';
        var goalInput = 'Run ' + miles + mi + ' in ' + duration;
        this.addGoal(this.props.userdata.DBID, goalInput);
    }

    converter (d) {
          d = Number(d);
          var h = Math.floor(d / 3600);
          var m = Math.floor(d % 3600 / 60);
          var s = Math.floor(d % 3600 % 60);
          s < 10 ? s = '0'+s : null
          m < 10 && h > 0 ? m = '0'+m : null;
          var hDisplay = h > 0 ? h + ':' : "";
          return hDisplay + m + ':' + s; 
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
                this.setState({value: ''});
            })
            .catch(err => console.log(err))
        }
    }

    getWeekAverage() {
      if (this.props.userdata.history.length > 0) {
        var hist = this.props.userdata.history;
        var time = 0;
        var count = 0;
        var dist = 0;
        for (var i=hist.length-1; i>=0; i--) {
            time += hist[i].duration
            dist += hist[i].distance
            count++
            if (count === 7) {
                break;
            }
        }

        time = time / count
        dist = dist / count
        var avg = time / dist
        avg = this.converter(avg);
            return ("Recently you've averaged " + avg + " per mile.")
        } else {
            return ("Can't find average mile data.")
        }
    }

    getTotalMiles() {
        if (this.props.userdata.history.length > 0) {
            var totalMiles = 0;
            for (var i = 0; i < this.props.userdata.history.length; i++) {
                totalMiles += this.props.userdata.history[i].distance;
            }
            totalMiles = Math.round(totalMiles * 10) / 10;
            return ("You've run " + totalMiles + " miles since signing up!");
        } else {
            return ("Can't find total mile data.");
        }
    }
    
    getDate() {
        var idx = this.props.userdata.history.length - 1;
        var exact = moment(new Date(this.props.userdata.history[idx].date)).fromNow()
        return exact
    }

    getRecentRun() {
        if (this.props.userdata.history.length > 0) {
            var idx = this.props.userdata.history.length - 1;
            var miles = Math.round(this.props.userdata.history[idx].distance * 10) / 10;
            var duration = this.converter(this.props.userdata.history[idx].duration);
            var date = this.getDate();
            return ("You ran " + miles + " miles in " + duration + " about " + date + ".");
        } else {
            return ("Can't find recent run data.");
        }
    }

    render() {
      if (!!localStorage.getItem("profile") === false){
        window.location.href= "/#/login"
        return false;
      } else {
        return (
            <div className="pageCont">
            <img className="yellowCircle" src="assets/circle.png"/>
            <div className="pageBG salmonBG" ></div>
              <Card.Group itemsPerRow={2} >
                <Card color="teal" style={{marginLeft: 32, marginRight: -10, width: '46%'}}>
                <Card.Content header='Goal Planner' />
                <Card.Content>

                {this.props.userdata.loading === true ? (<Segment>
                  <Dimmer active inverted>
                  <Loader size="small">Loading</Loader>
                  </Dimmer><br /><br /><br /><br />
                </Segment>) : ( <div>
                    <Feed>
                    <Feed.Event>
                    <Feed.Content>
                        <Feed.Date />
                        <Feed.Summary>
                            {this.getRecentRun()}
                        </Feed.Summary>
                    </Feed.Content>
                    </Feed.Event>
                    <br />
                    <Feed.Event>
                    <Feed.Content>
                        <Feed.Date />
                        <Feed.Summary>
                            {this.getWeekAverage()}
                        </Feed.Summary>
                    </Feed.Content>
                    </Feed.Event>
                    <br />
                    <Feed.Event>
                    <Feed.Content>
                        <Feed.Date />
                        <Feed.Summary>
                            {this.getTotalMiles()}
                            <br />
                        </Feed.Summary>
                    </Feed.Content>
                    </Feed.Event>
                    </Feed>
                    <br />
                    <div>Get a customized goal! </div>
                    <div className="ui small icon input"> 
                      <input type="text" placeholder="Enter miles to run" value={this.state.value} onChange={this.handleChange}/>
                      <div className="ui small button teal" 
                      onClick={() => {this.handleSubmit(this.state.value)}}>Submit</div>
                    </div>
                <br />
                <br />
                <div style={{color: 'red', fontSize: 12}}>{this.state.error}</div>
                </div>
                )}

                </Card.Content>
                </Card>
                <BubbleChart />
                <LineChart />
                <WeeklyChart />
                </Card.Group>
            </div>
        )
      }
    }
}

export default Analytics
