import React from 'react';
import { Card } from 'semantic-ui-react';
import moment from 'moment';

export default class HistoryCard extends React.Component {
    constructor(props) {
        super(props)
    }

    getDescription() {
        var minutes = (this.props.hist.duration / 60).toFixed(1);
        var miles = Math.round(this.props.hist.distance * 10) / 10;
        return ("You ran " + miles + " miles in " + minutes + " minutes.");
    }

    getDate() {
        return ((this.props.hist.date).substring(0,10));
    }

    render() {
        return (
            <Card color="teal">
                <Card.Content header={this.getDate()} />
                <Card.Content description={this.getDescription()} />
                <Card.Content extra>
                </Card.Content>
            </Card>
        )
    }
}

//date
//distance
//duration / 60
//route
//startingLat, startingLong
