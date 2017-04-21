import React from 'react';
import { connect } from 'react-redux';
import { Grid, Row, Col, Icon, Card, Header, Segment, Dimmer, Loader } from 'semantic-ui-react';
import * as UserActions from '../actions';
import axios from 'axios';

@connect((store) => {
  return {
    userdata: store.userdata,
  };
})

class TopSoloCard extends React.Component {
  constructor(props) {
    super();
    this.state = {
      userdata: null,
      topSolo: null
    }
  }
  
  componentWillMount() {
    axios.get('/api/soloKing')
      .then((results) => {
        // store as [{}] topSolo -> convert seconds
        this.setState({
          topSolo: results.data
        })
      })
  }

  convertSeconds (d) {
    d = Number(d);
    var h = Math.floor(d / 3600);
    var m = Math.floor(d % 3600 / 60);
    var s = Math.floor(d % 3600 % 60);
    s < 10 ? s = '0'+s : null
    m < 10 && h > 0 ? m = '0'+m : null;
    var hDisplay = h > 0 ? h + ':' : "";
    return hDisplay + m + ':' + s; 
  }

  render() {
    return (
      <Card className='teal'>
        <Card.Content>
          <Card.Header>
            <Grid>
              <Grid.Column>
                Top Solo
              </Grid.Column>
            </Grid>
          </Card.Header>
          </Card.Content>

          <Card.Content>
            {this.state.topSolo === null ? (<Segment>
              <Dimmer active inverted>
                <Loader size="small">Loading</Loader>
              </Dimmer><br /><br /><br /><br />
            </Segment>) : ( 
              this.state.topSolo.map((user, idx) => {
                return <div key={idx}>
              <Grid columns={2}>
              <Grid.Column>
                {idx+1 + '. ' + user.username}
              </Grid.Column>
              <Grid.Column style={{textAlign: 'right'}}>
                {this.convertSeconds(user.bestSoloThreeMi)}
              </Grid.Column>
              </Grid>
                </div>

              })
            )}
        </Card.Content>
      </Card>
    )
  }
}

export default TopSoloCard;