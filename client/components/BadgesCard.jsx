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
  state = {
    allBadges: [
      {image: '50miles.png', description: 'Ran 50 Miles'}, 
      {image: '200miles.png', description: 'Ran 200 Miles'}, 
      {image: '1000miles.png', description: 'Ran 1000 Miles'}, 
      {image: '10goals.png', description: 'Achieved 10 Goals'}, 
      {image: '50goals.png', description: 'Achieved 50 Goals'}, 
      {image: '200goals.png', description: 'Achieved 200 Goals'},
      {image: '100hrs.png', description: 'Ran for 100 hours'}
    ],
    totalMiles: '',
    totalGoals: 0

  };

  componentDidUpdate() {
    if (this.props.userdata.history.length > 1) {
      var totalMiles = 0;
      for (var i = 0; i < this.props.userdata.history.length; i++) {
        totalMiles += this.props.userdata.history[i].distance;
      }
      this.setState({totalMiles: totalMiles});
    }
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

        this.state.allBadges.map((badge, idx) => {
          if (this.state.totalMiles >= 50 && badge.description === 'Ran 50 Miles') {
            return <div key={idx} className="imgContainer"><img src={'assets/' + badge.image} className="badgeImg"/>
            <p>{badge.description}</p>
            </div>
          } else if (this.state.totalMiles >= 200 && badge.description === 'Ran 200 Miles') {
            return <div key={idx} className="imgContainer"><img src={'assets/' + badge.image} className="badgeImg"/>
            <p>{badge.description}</p>
            </div>            
          } else if (this.state.totalMiles >= 1000 && badge.description === 'Ran 1000 Miles') {
            return <div key={idx} className="imgContainer"><img src={'assets/' + badge.image} className="badgeImg"/>
            <p>{badge.description}</p>
            </div>            
          } else if (badge.description === 'Achieved 10 Goals') {
            return <div key={idx} className="imgContainer"><img src={'assets/' + badge.image} className="badgeImg"/>
            <p>{badge.description, this.state.totalGoals}</p>
            </div>            
          } else if (badge.description === 'Achieved 50 Goals') {
            return <div key={idx} className="imgContainer"><img src={'assets/' + badge.image} className="badgeImg"/>
            <p>{badge.description}</p>
            </div>            
          } else if (badge.description === 'Achieved 200 Goals') {
            return <div key={idx} className="imgContainer"><img src={'assets/' + badge.image} className="badgeImg"/>
            <p>{badge.description}</p>
            </div>            
          } else if (badge.description === 'Ran for 100 hours') {
            return <div key={idx} className="imgContainer"><img src={'assets/' + badge.image} className="badgeImg"/>
            <p>{badge.description, this.state.totalMiles}</p>
            </div>            
          } 
        })
      )}
      
      </Card.Content>
      </Card>
    );
  }
}

export default BadgesCard;
