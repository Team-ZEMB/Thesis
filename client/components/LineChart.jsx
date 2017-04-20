import React from 'react';
import { Line } from 'react-chartjs-2';
import regression from 'regression';
import { connect } from 'react-redux';
import axios from 'axios';
import { Card, Dimmer, Segment, Loader } from 'semantic-ui-react'

@connect((store) => {
    return {
        userdata: store.userdata,
    };
})

class LineChart extends React.Component {
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

    getData(input) {

        //input should be an empty array unless you are adding prediction tuples [miles, null]
        var hist = this.props.userdata.history;
        for (var j = 0; j < hist.length; j++) {
            var tuple = [];
            var minutes = this.props.userdata.history[j].duration / 60;
            tuple.push(this.props.userdata.history[j].distance);
            tuple.push(minutes);
            input.push(tuple);
        }

        var sorted = input.sort(function (a, b) {
            return a[0] - b[0];
        });

        var result = regression('linear', sorted);

        var unzip = function (array, index) {
            var output = [];
            for (var i = 0; i < array.length; i++) {
                output.push(array[i][index]);
            }
            return output;
        }

        var xArray = unzip(result.points, 0);
        var yArray = unzip(result.points, 1);

        return ({
            labels: xArray,
            datasets: [
                {
                    label: "Miles / Minutes",
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
        });
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

        var convertedTime = this.converter(expectedTime * 60);

        var goalInput = "Run " + miles + " miles in " + convertedTime + ".";

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
            .catch(err => console.log('Unable to generate goal'))
        }
    }

    render() {
        return (
              <Card color="teal" style={{marginLeft: 32, marginRight: -10, width: '46%', fontFamily: 'avenir'}}>
                <Card.Content header='Time Per Mile Trend' />
                <Card.Content>
                { this.props.userdata.loading === true ? (<Segment>
                    <Dimmer active inverted>
                        <Loader size='small'>Loading</Loader>
                    </Dimmer><br /><br /><br /><br />
                    </Segment>) :  (
                  <div>
                 <Line data={this.getData([])} />
                </div>)}
                    </Card.Content>
                </Card>
        );
    }
};

export default LineChart