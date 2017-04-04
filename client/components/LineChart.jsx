import React from 'react';
import { Line } from 'react-chartjs';

class LineChart extends React.Component {
    constructor(data, options) {
        super()
    }
    render() {
        return (
            <div>
                <Line data={this.props.data} options={this.props.options} width="600" height="250"/>
            </div>
        )
    }
}

export default LineChart