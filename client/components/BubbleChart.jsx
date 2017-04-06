import React from 'react';
import { connect } from 'react-redux'
import { Bubble } from 'react-chartjs-2';
import moment from 'moment'

@connect((store) => {
  return {
    userdata: store.userdata,
  };
})

class BubbleChart extends React.Component {

    getData() {
        //data is an array of objects with x(date), y(rate) and z(distance) props

        var resultsArray = [{x: 4.75, y: 2, r: 10}];
        var datesArray = [];

        for (var i = 0; i < this.props.userdata.history.length; i++) {

            var triple = {};
            console.log('DATE', this.props.userdata.history[i].date)

            //this.props.userdata.history[i].distance / this.props.userdata.history[i].duration

            triple.x = i;
            triple.y = this.props.userdata.history[i].duration / 60;
            triple.r = Math.ceil(this.props.userdata.history[i].distance * 10);

            console.log('triple object', triple);

            datesArray.push(this.props.userdata.history[i].date)
            resultsArray.push(triple);

            console.log('resultsArray ', resultsArray);
        }



        return {
            xLabels: datesArray,
            datasets: [
                {
                    label: 'Date / Minutes / Distance',
                    fill: false,
                    lineTension: 0.1,
                    backgroundColor: 'rgba(75,192,192,0.4)',
                    borderColor: 'rgba(75,192,192,1)',
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointBorderColor: 'rgba(75,192,192,1)',
                    pointBackgroundColor: '#fff',
                    pointBorderWidth: 1,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                    pointHoverBorderColor: 'rgba(220,220,220,1)',
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 10,
                    data: resultsArray
                }
            ]
        };
    }

    render() {
        return (
            <div>
                <h2>Progress</h2>
                <p>Tracks your past runs by date and predicts future progress</p>
                <p>dev - x chronological run id, y minutes, r distance representation</p> 
                <Bubble data={this.getData()} />
            </div>
        );
    }
};

export default BubbleChart