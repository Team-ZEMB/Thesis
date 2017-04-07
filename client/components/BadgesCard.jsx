import React from 'react';
import { connect } from 'react-redux';
import { Grid, Row, Col, Icon, Card, Segment, Dimmer, Loader, Header } from 'semantic-ui-react';

@connect((store) => {
  return {
    userdata: store.userdata,
  };
})

class BadgesCard extends React.Component {
  constructor(props) {
    super();
  }
  render() {
    return (
    <Card>
    <Card.Content>
      <Card.Header>            
        <Grid>
          <Grid.Column>
            Badges
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
        this.props.userdata.badges.map((badge, idx) => {
       return <div key={idx} className="imgContainer"><img src={'assets/' + badge.image} className="badgeImg"/>
         <p>{badge.description}</p>
       </div>
      }))}
      
      </Card.Content>
      </Card>
    );
  }
}

export default BadgesCard;
