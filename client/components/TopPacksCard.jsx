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

class TopPacksCard extends React.Component {
  constructor(props) {
    super();
    this.state = {
      userdata: '',
      packs: null,
      topPacks: [1,2,3]
    }
  }
  
  componentWillMount() {
    axios.get('/api/packs')
      .then((results) => {
        this.setState({
          packs: results.data,
        })
      })
    axios.get('/api/king')
      .then((results) => {
        this.sortPackTimes(results.data)
      })
  }

  componentWillReceiveProps(props) {
    this.setState({userdata: props.userdata})
  }

  sortPackTimes(userspacks) {
    var packTimes = {};
    var competingPacks = [];
    for (var i = 0; i < userspacks.length; i++) {
      if (packTimes[userspacks[i].PackId]) {
        packTimes[userspacks[i].PackId].push(userspacks[i].bestThreeMile);
      } else {
        packTimes[userspacks[i].PackId] = [userspacks[i].bestThreeMile];
      }
    }
    for (var key in packTimes) {
      if (packTimes[key].length >= 2 && !packTimes[key].includes(null)) {
        var memberCount = 0;
        var totalSecs = 0;
        for (var i = 0; i < packTimes[key].length; i++) {
          memberCount++;
          totalSecs += packTimes[key][i];  
        }
        var avgTime = totalSecs/memberCount;
        competingPacks.push({PackId: key, avgThreeMile: avgTime})
      }
    }
    competingPacks.sort(function(a, b) {
      return a.avgThreeMile - b.avgThreeMile;
    });
    if (competingPacks.length > 10) {
      competingPacks.splice(10, competingPacks.length-10);
    }
    this.getPackNames(competingPacks);
  }

  convertSeconds (d) {
    d = Number(d);
    var h = Math.floor(d / 3600);
    var m = Math.floor(d % 3600 / 60);
    var s = Math.floor(d % 3600 % 60);
    s < 10 ? s = '0'+s : null;
    m < 10 && h > 0 ? m = '0'+m : null;
    var hDisplay = h > 0 ? h + ':' : "";
    return hDisplay + m + ':' + s;
  }

  getPackNames(topPacks) {
    var leaders = [];
    for (var i = 0; i < topPacks.length; i++) {
      if (this.state.packs) {
        for (var j = 0; j < this.state.packs.length; j++) {
          if (topPacks[i].PackId == this.state.packs[j].id) {
            leaders.push({name: this.state.packs[j].name, avgTime: topPacks[i].avgThreeMile})
          }
        }
      }
    }
    this.setState({topPacks: leaders})
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
            {this.state.packs === null ? (<Segment>
              <Dimmer active inverted>
                <Loader size="small">Loading</Loader>
              </Dimmer><br /><br /><br /><br />
            </Segment>) : ( 
              this.state.topPacks.map((pack, idx) => {
                return <div key={idx}>
              <Grid columns={2}>
              <Grid.Column>
                {idx+1 + '. ' + pack.name}
              </Grid.Column>
              <Grid.Column style={{textAlign: 'right'}}>
                {this.convertSeconds(pack.avgTime)}
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

export default TopPacksCard;