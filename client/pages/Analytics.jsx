import React from 'react'
import regression from 'regression'
import Charts from 'chart.js'
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

var mileTimeRegression = {
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

//rate by date, size representing distance
//bubble chart
var progressData = {
    labels: xArray2,
    datasets: [
        {
            label: "Run time regression",
            fill: true,
            xAxisID: "Date",
            yAxisID: "",
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
            data: yArray2,
            spanGaps: false,
        }
    ]
};

var options;

class Analytics extends React.Component {
    constructor() {
        super()
    }
    render() {
        return (
            <div>
                <p>sorted time regression per mile (not actual mile times)</p>
                <MyChart data={mileTimeRegression} options={options} />
                <p>progress by date</p>
                <MyChart data ={progressData} options={options} />
            </div>
        )
    }
}

export default Analytics