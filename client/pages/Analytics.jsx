import React from 'react';
import regression from 'regression';
import LineChart from '../components/LineChart';
import BubbleChart from '../components/BubbleChart';
import { Chart } from 'chart.js'

Chart.defaults.global.legend.display = false;

class Analytics extends React.Component {
    constructor() {
        super()
    }
    render() {
        return (
            <div>
                <BubbleChart />
                <LineChart />
            </div>
        )
    }
}

export default Analytics
