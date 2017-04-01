import React from 'react'
import { Line } from 'react-chartjs'

class MyChart extends React.Component {
    constructor(data, options) {
        super()
    }
    render() {
        return (
            <div>
                <h3>My Run History & Projections</h3>
                <Line data={this.props.data} options={this.props.options} width="600" height="250"/>
            </div>
        )
    }
}

export default MyChart