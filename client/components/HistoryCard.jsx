import React from 'react';
import { Card } from 'semantic-ui-react';
import moment from 'moment';

export default class HistoryCard extends React.Component {

  getDescription() {
    const minutes = (this.props.hist.duration / 60).toFixed(1);
    const converter = function (d) {
      d = Number(d);
      var h = Math.floor(d / 3600);
      var m = Math.floor(d % 3600 / 60);
      var s = Math.floor(d % 3600 % 60);
      s < 10 ? s = '0'+s : null;
      m < 10 && h > 0 ? m = '0'+m : null;
      var hDisplay = h > 0 ? h + ':' : "";
      return hDisplay + m + ':' + s;
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
