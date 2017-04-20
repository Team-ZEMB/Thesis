import React from 'react';
import ReactDOM from 'react-dom';
import { Line } from 'react-chartjs-2';
import regression from 'regression';
import { connect } from 'react-redux';
import axios from 'axios';
import { Card, Dimmer, Segment, Loader } from 'semantic-ui-react'
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
                console.log(d);
                console.log("you clicked {" + d.name + ": " + categories[d.x] + ": " + d.value + "}");
            }
        };



        return (
              <Card color="teal" style={{marginRight: 25, marginLeft: 32, width: '46%', fontFamily: 'avenir'}}>
                <Card.Content header='Weekly Activity Summary' />
                <Card.Content description='10 Week Rolling Average' />
                { this.props.userdata.loading === true ? (<Segment>
                    <Dimmer active inverted>
                        <Loader size='small'>Loading</Loader>
                    </Dimmer><br /><br /><br /><br />
                    </Segment>) :  (
                        <div> 
                    <C3Chart data={this.state.data} type="multiBar" options={options}/>
                </div>)}
                </Card>
        );
    }
};

export default WeeklyChart