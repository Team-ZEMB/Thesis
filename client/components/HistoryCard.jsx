import React from 'react';
import { Card } from 'semantic-ui-react';
import moment from 'moment';

export default class HistoryCard extends React.Component {
    constructor(props) {
        super(props)
    }

    getDescription() {
        var minutes = (this.props.hist.duration / 60).toFixed(1);
        var converter = function (d) {
            d = Number(d);
            var h = Math.floor(d / 3600);
            var m = Math.floor(d % 3600 / 60);
            var s = Math.floor(d % 3600 % 60);

            var hDisplay = h > 0 ? h + (h == 1 ? " hour, " : " hours, ") : "";
            var mDisplay = m > 0 ? m + (m == 1 ? " minute, " : " minutes, ") : "";
            var sDisplay = s > 0 ? s + (s == 1 ? " second" : " seconds") : "";
            return hDisplay + mDisplay + sDisplay; 
        }
        var duration = converter(this.props.hist.duration)
        var miles = Math.round(this.props.hist.distance * 10) / 10;
        return ("You ran " + miles + " miles in " + duration + '.');
    }

    getDate() {
        var exact = moment(new Date(this.props.hist.date)).fromNow()
        console.log(exact)
        return exact
    }

    render() {
        return (
            <Card className="teal raised hist">
                <Card.Content header={this.getDate()} />
                <Card.Content description={this.getDescription()} />
            </Card>
        )
    }
}

//date
//distance
//duration / 60
//route
//startingLat, startingLong
