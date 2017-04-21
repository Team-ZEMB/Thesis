import React from 'react';
import ReactDOM from 'react-dom';
import { Line } from 'react-chartjs-2';
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
            data : [
                {
                    key: "dataSource1",
                    values: [
                    {label: "A", value: 3},
                    {label: "B", value: 4}
                    ]
                },
                {
                    key: "dataSource2",
                    values: [
                    {label: "X", value: 7},
                    {label: "Y", value: 8}
                    ]
                }
            ],
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

        let options = {
            padding: {
                top: 20,
                bottom: 20,
                left: 40,
                right: 10
            },
            zoom: true,
            grid: {
                x: false,
                y: true
            },
            labels: true,
            axisLabel: {
                x: "product",
                y: "quantity"
            },
            onClick: function(d) {
                let categories = this.categories(); //c3 function, get categorical labels
                console.log("you clicked {" + d.name + ": " + categories[d.x] + ": " + d.value + "}");
            }
        };
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

                        <Button className="small" color="teal" onClick={() => this.machineGoal()}> Don't Click </Button>
                        { this.state.showTimeError ? (<Message
                        error
                        header='Unable to process request'
                        list={[
                        'You must have at least five saved runs to generate a customized goal.',
                        ]}
                        />) : null }
                        <br />
                    <C3Chart data={this.state.data} type="multiBar" options={options}/>
                  </div>
                )}
                </Card.Content>
                </Card>
        );
    }
};

export default WeeklyChart