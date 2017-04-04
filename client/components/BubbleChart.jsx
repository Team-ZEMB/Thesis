import React from 'react';
import { Bubble } from 'react-chartjs';

class BubbleChart extends React.Component {
    constructor(data, options) {
        super()
    }
    render() {
        return (
            <div>
                <Bubble data={this.props.data} options={this.props.options} width="600" height="250"/>
            </div>
        )
    }   
}

export default BubbleChart