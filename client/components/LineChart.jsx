import React from 'react';
import { Line } from 'react-chartjs-2';
import regression from 'regression';
import { connect } from 'react-redux';

@connect((store) => {
  return {
    userdata: store.userdata,
  };
})

class LineChart extends React.Component{

    getData() {
        var input = [];

        var hist = this.props.userdata.history

        console.log('history: ', hist);

        for (var j = 0; j < hist.length; j++) {
            var tuple = [];
            var minutes = this.props.userdata.history[j].duration / 60;
            tuple.push(this.props.userdata.history[j].distance);
            tuple.push(minutes);
            input.push(tuple);
        }
        console.log('input: ', input);

        var sorted = input.sort(function(a,b) {
            return a[0] - b[0];
        });

        console.log('sorted array: ', sorted);

        var result = regression('linear', sorted);

        console.log('regression result: ', result);

        var unzip = function(array, index) {
        var output = [];
        for (var i = 0; i < array.length; i++) {
            output.push(array[i][index]);
        }
            return output;
        }

        var xArray = unzip(result.points, 0);
        var yArray = unzip(result.points, 1);

        console.log('x data: ', xArray);
        console.log('y data: ', yArray);

        return ({
            labels: xArray,
            datasets: [
                {
                    label: "Linear regression: best-fit",
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

    render() {
        console.log("line graph data: ", this.getData());
        return (
            <div>
                <h2>Time Estimates</h2>
                <p>Predicts the time it will take you to run a number of miles based on your history</p>
                <Line data={this.getData()} />
            </div>
        );
    }
};

export default LineChart