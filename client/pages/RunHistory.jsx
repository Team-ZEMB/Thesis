import React from 'react';
import { connect } from 'react-redux';
import HistoryCard from '../components/HistoryCard';
import { Card } from 'semantic-ui-react'

@connect((store) => {
  return {
    userdata: store.userdata,
  };
})

export default class RunHistory extends React.Component {
  render() {
    return (
      <Card.Group itemsPerRow={2}>
        {this.props.userdata.history.map(function(history) {
          return <HistoryCard hist={history} />;
        })}
      </Card.Group>
    )
  }
}
