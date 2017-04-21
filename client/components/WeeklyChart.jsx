import React from 'react';
import ReactDOM from 'react-dom';
import { Pie } from 'react-chartjs-2';
import regression from 'regression';
import { connect } from 'react-redux';
import axios from 'axios';
import { Button, Card, Grid, Message, Feed, Segment, Dimmer, Loader } from 'semantic-ui-react';
import C3Chart from 'c3-react'

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
    machineGoal() {
        axios.post('/api/machineGoal', {
            UserId: this.props.userdata.DBID,
            customInput: "TBD",
        })
        .then((res) => {
            if (res.data === 'Under 7 days') {
                this.setState({
                    showTimeError: true
                })
                setTimeout(() => {
                    this.setState({
                        showTimeError: false
                    })
                }, 10000);
            } else {
                console.log(res.data)
            }
        })
        .catch(err => console.log(err))
    }
    
    render() {

        const data = {
            labels: [
                'Time of Day',
                'Day of Week',
                'Distance',
                'Elevation',
                'Path Incline'
            ],
            datasets: [{
                data: [300, 200, 200, 200, 200],
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
              <Card color="teal" style={{ marginLeft: 32, width: '46%', fontFamily: 'avenir'}}>
                <Card.Content header='Customized Performance Analysis' />
                <Card.Content>
                {/*{ this.props.userdata.loading === true ? (<Segment>
                    <Dimmer active inverted>
                        <Loader size='small'>Loading</Loader>
                    </Dimmer><br /><br /><br /><br />
                    </Segment>) :  (*/}
                        <div> 

                    {/**    <Button className="small" color="teal" onClick={() => this.machineGoal()}> Don't Click </Button> 
                        { this.state.showTimeError ? (<Message
                        error
                        header='Unable to process request'
                        list={[
                        'You must have at least five saved runs to generate a customized goal.',
                        ]}
                        />) : null }
                        <br />
                    **/}
                    <Pie data={data} />
                  </div>
                {/*)}*/}
                </Card.Content>
                </Card>
        );
    }
};

export default WeeklyChart