import React from 'react';
import { connect } from 'react-redux';
import { Grid, Row, Col, Icon, Card, Header, Segment, Dimmer, Loader } from 'semantic-ui-react';

@connect((store) => {
  return {
    userdata: store.userdata,
  };
})

export default class Leaderboard extends React.Component {
  constructor() {
    super();
    this.state = {
      UserId: ''
    };
  }

  render() {
    return (
    <Card className='teal'>
    <Card.Content>
      <Card.Header>
        <Grid>
          <Grid.Column>
            Top Packs
          </Grid.Column>
        </Grid>
      </Card.Header>
      </Card.Content>

      <Card.Content>
      {this.props.userdata.loading === true ? (<Segment>
                <Dimmer active inverted>
                <Loader size="small">Loading</Loader>
                </Dimmer><br /><br /><br /><br />
            </Segment>) : ( 


            <div>stuff here </div>


    )}
    </Card.Content>
    </Card>
    )
  }
}
