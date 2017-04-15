import React from 'react';
import { Card } from 'semantic-ui-react';
import moment from 'moment';

export default class HistoryCard extends React.Component {

  getDescription() {
    const minutes = (this.props.hist.duration / 60).toFixed(1);
    const converter = function (d) {
      d = Number(d);
      const h = Math.floor(d / 3600);
      const m = Math.floor(d % 3600 / 60);
      const s = Math.floor(d % 3600 % 60);

      const hDisplay = h > 0 ? h + (h == 1 ? ' hour, ' : ' hours, ') : '';
      const mDisplay = m > 0 ? m + (m == 1 ? ' minute, ' : ' minutes, ') : '';
      const sDisplay = s > 0 ? s + (s == 1 ? ' second' : ' seconds') : '';
      return hDisplay + mDisplay + sDisplay;
    };
    const duration = converter(this.props.hist.duration);
    const miles = Math.round(this.props.hist.distance * 10) / 10;
    return (`You ran ${miles } miles in ${duration }.`);
  }

  getDate() {
    const exact = moment(new Date(this.props.hist.date)).fromNow();
    return exact;
  }

  render() {
    return (
      <Card className="teal raised hist">
        <Card.Content header={this.getDate()} />
        <Card.Content description={this.getDescription()} />
      </Card>
    );
  }
}
