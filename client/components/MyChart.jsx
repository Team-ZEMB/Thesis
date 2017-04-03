import React from 'react';
import { Line } from 'react-chartjs';
import regression from 'regression';
import moment from 'moment';

//var result = regression('linear', input);

class MyChart extends React.Component {
    constructor(data, options) {
        super()
    }
    render() {
        return (
            <div>
                <h3>sorted mile time regression (not actual mile times)</h3>
                <Line data={this.props.data} options={this.props.options} width="600" height="250"/>
            </div>
        )
    }
}

export default MyChart