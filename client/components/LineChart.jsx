import React from 'react';
import { Line } from 'react-chartjs-2';
import regression from 'regression';
import { connect } from 'react-redux';
import axios from 'axios';

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

        var goalInput = "Run " + miles + " miles in " + expectedTime + " minutes.";

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
                <h2>Miles Times</h2>
                <p>Predicts the time it will take you to run a number of miles based on your history</p>
                <p>dev - x miles, y minutes</p>
                <Line data={this.getData([])} />
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Set a goal (miles): 
                        <input type="number" name="mileGoal" value={this.state.value} onChange={this.handleChange}/>
                    </label>
                    <input type="submit" value="Submit" />
                </form>
            </div>
        );
    }
};

export default LineChart