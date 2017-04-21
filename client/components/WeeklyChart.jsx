import React from 'react';
import ReactDOM from 'react-dom';
import { Pie } from 'react-chartjs-2';
import regression from 'regression';
import { connect } from 'react-redux';
import axios from 'axios';
import { Button, Card, Grid, Message, Feed, Segment, Dimmer, Loader } from 'semantic-ui-react';
import * as UserActions from '../actions';

// import C3Chart from 'c3-react'

@connect((store) => {
    return {
        userdata: store.userdata,
    };
})

class WeeklyChart extends React.Component {
    constructor() {
        super()
        this.state = {
            showTimeError: false,
        }
    }
    componentWillMount() {
        this.props.dispatch(UserActions.updateMlGoal(this.props.userdata))
    }

    renderPie() {
        console.log(this.props.userdata)
        console.log(this.props.userdata.machineGoal)
        if ( !!this.props.userdata.machineGoal) {
            // {"knc": "Afternoon", "skb": {"dayOfWeek": 10, "distance": 35, "altitude": 10, "timeOfDay": 25, "altitudeChange": 20}}
            console.log(this.props.userdata.machineGoal)
            var goal = JSON.parse(this.props.userdata.machineGoal).skb
            var bestTime = JSON.parse(this.props.userdata.machineGoal).knc 
        const data = {
            labels: [
                'Time of Day',
                'Day of Week',
                'Distance',
                'Elevation',
                'Path Incline'
            ],
            datasets: [{
                data: [goal.timeOfDay, goal.dayOfWeek, goal.distance, goal.altitude, goal.altitudeChange],
                backgroundColor: [
                '#FF8C69',
                '#fae2b4',
                '#008080',
                '#FFD769',
                '#3581c6'
                ],
                hoverBackgroundColor: [
                '#FF8C69',
                '#fae2b4',
                '#008080',
                '#FFD769',
                '#3581c6'
                ]
            }]
        };
        return (
            <div>
                <p>Your best runs tend to occur in the <a>{bestTime}</a></p>
             <Pie data={data} />
             </div>
        )
        } else {
            return (<div style={{color: 'red', fontSize: 12}}>Performance analytics are available after five runs.</div>)
        }
    }

    render() {
        return (
              <Card color="teal" style={{ marginLeft: 32, width: '46%', fontFamily: 'avenir'}}>
                <Card.Content header='Customized Performance Analysis' />
                <Card.Content>
                { this.props.userdata.loading === true ? (<Segment>
                    <Dimmer active inverted>
                        <Loader size='small'>Loading</Loader>
                    </Dimmer><br /><br /><br /><br />
                    </Segment>) :  (
                        <div> 

                     {/*<Button className="small" color="teal" onClick={() => this.machineGoal()}> Don't Click </Button> */}
                        { this.state.showTimeError ? (<Message
                        error
                        header='Unable to process request'
                        list={[
                        'You must have at least five saved runs to generate a customized goal.',
                        ]}
                        />) : null }
                   {this.renderPie()}
                  </div>
                )}
                </Card.Content>
                </Card>
        );
    }
};

export default WeeklyChart