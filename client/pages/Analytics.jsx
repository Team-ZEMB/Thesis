import React from 'react';
import regression from 'regression';
import LineChart from '../components/LineChart';
import BubbleChart from '../components/BubbleChart';

class Analytics extends React.Component {
    constructor() {
        super()
    }
    render() {
        return (
            <div>
                <LineChart />
                <BubbleChart />
            </div>
        )
    }
}

export default Analytics
