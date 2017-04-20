import React from 'react';
import { connect } from 'react-redux'
import { Bubble } from 'react-chartjs-2';
import { Card, Dimmer, Loader, Segment } from 'semantic-ui-react';

@connect((store) => {
  return {
    userdata: store.userdata,
  };
})

class BubbleChart extends React.Component {

    getData() {
        //data is an array of objects with x(date), y(rate) and z(distance) props

        var resultsArray = [];
        var datesArray = [];

        for (var i = 0; i < this.props.userdata.history.length; i++) {

            var triple = {};

            //this.props.userdata.history[i].distance / this.props.userdata.history[i].duration

            triple.x = i;
            triple.y = this.props.userdata.history[i].duration / 60;
            triple.r = Math.ceil(this.props.userdata.history[i].distance * 5);

            datesArray.push(this.props.userdata.history[i].date)
            resultsArray.push(triple);
        }
        

        console.log(datesArray[9] - datesArray[0]);
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
            <Card color="teal" style={{marginLeft: 32, width: '46%'}}>
                <Card.Content header='Tracks your past runs by date and predicts future progress' />
                <Card.Content>
                 { this.props.userdata.loading === true ? (<Segment>
                    <Dimmer active inverted>
                        <Loader size='small'>Loading</Loader>
                    </Dimmer><br /><br /><br /><br />
                    </Segment>) :  (
                <Bubble data={this.getData()} />
                    )}
                    </Card.Content>
            </Card>
        );
    }
};

export default BubbleChart