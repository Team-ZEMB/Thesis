import React from 'react';
import { connect } from 'react-redux';
import { Grid, Row, Col, Accordion, Icon, Card, Header, Segment, Dimmer, Loader } from 'semantic-ui-react';
import axios from 'axios';
import * as UserActions from '../actions';

@connect((store) => {
  return {
    userdata: store.userdata,
  };
})

class GoalsCard extends React.Component {
  constructor(props) {
    super();
    this.state = {
      userInput: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.completedGoal = this.completedGoal.bind(this);
    this.addGoal = this.addGoal.bind(this);
    this.acceptChallenge = this.acceptChallenge.bind(this);
    this.rejectChallenge = this.rejectChallenge.bind(this);
  }

  handleChange(event) {
    this.setState({userInput: event.target.value});
  }

  addGoal(user, input) {
    var that = this;
    if (input.length > 1) {
      axios.post('/api/goals', {
        UserId: user,
        description: input, 
        status: 'accepted'
      })
      .then((res) => {
        that.setState({userInput: ''});
        that.props.dispatch(UserActions.signIn());
      })
      .catch(err => console.log(err))
    }
  }

  acceptChallenge(id) {
    var that = this;
    axios.put('/api/goals', {
      id: id,
      status: 'accepted'
    })
    .then((res) => {
      that.props.dispatch(UserActions.signIn());
    })
    .catch(err => console.log(err))
  }

  rejectChallenge(id) {
    var that = this;
    axios.request({
      url: '/api/goals',
      method: 'delete',
      data: { id: id }
    });
    that.props.dispatch(UserActions.signIn());
  }

  completedGoal(id) {
    var that = this;
    axios.put('/api/goals', {
      id: id,
      status: 'completed'
    })
    .then((res) => {
      that.props.dispatch(UserActions.signIn());
    })
    .catch(err => console.log(err))
  }

  render() {
    return (
    <Card>
    <Card.Content>
      <Card.Header>            
        <Grid>
          <Grid.Column>
            Goals and Challenges
          </Grid.Column>
        </Grid>
      </Card.Header>
      </Card.Content>

      <Card.Content>
      {this.props.userdata.loading === true ? (<Segment>
                <Dimmer active inverted>
                <Loader size="small">Loading</Loader>
                </Dimmer><br /><br /><br /><br />
            </Segment>) : ( this.props.userdata.goals.map((goal, idx) => {
      var goalId = goal.id;
        if (goal.source === null && goal.status === 'accepted') {
          return <div className="goal" key={idx}>
          <Grid>
            <Grid.Row>
              <div className="goalText">{"My Goal: " + goal.description}</div>
              <div className="completeGoal" onClick={() => {this.completedGoal(goalId)}}>✔</div>
            </Grid.Row>
          </Grid>
          </div>
        } else if (goal.source !== null && goal.status === 'pending') {
          return <div className="pendingChallenge" key={idx}>
          <Grid>
            <Grid.Row>
              <div className="challengeText">{"Challenge from " + goal.source + ": " + goal.description}</div>
              <Grid.Column>
              <div className="acceptChallenge" onClick={() => {this.acceptChallenge(goalId)}}>✔</div>
              <div className="rejectChallenge" onClick={() => {this.rejectChallenge(goalId)}}>✘</div>
              </Grid.Column>
            </Grid.Row>
          </Grid>
          </div>
        } else if (goal.source !== null && goal.status === 'accepted'){
          return <div className="challenge" key={idx}>
          <Grid>
            <Grid.Row>
              <div className="challengeText">{"Challenge from " + goal.source + ": " + goal.description}</div>
              <div className="completeGoal" onClick={() => {this.completedGoal(goalId)}}>✔</div>
            </Grid.Row>
          </Grid>
          </div>
        } else if (goal.status === 'generated') {
          return <div className="generatedGoal" key={idx}>
          <Grid>
            <Grid.Row>
              <div className="challengeText">{"Rabbit Goal: " + goal.description}</div>
              <div className="completeGoal" onClick={() => {this.completedGoal(goalId)}}>✔</div>
            </Grid.Row>
          </Grid>
          </div>
      }
      }) 
    )}
    {this.props.userdata.loading === true ? (<div></div>) : (
    <div className="ui small icon input">
      <input type="text" placeholder="Add new goal" value={this.state.userInput} onChange={this.handleChange}/>
      <div className="ui small button" onClick={() => {this.addGoal(this.props.userdata.DBID, this.state.userInput)}}>Submit</div>
    </div>
    )}
    {this.props.userdata.loading === true ? (<div></div>) : (
    <Accordion className="completedGoals">

      <Accordion.Title>
        <Icon name="dropdown" /> completed goals and challenges
      </Accordion.Title>

      <Accordion.Content className="accContent">
        {
          this.props.userdata.goals.map((goal, idx) => { 
            if (goal.status === 'completed') {
            return <p key={idx}>{goal.description}</p>
          }
          })
        }
      </Accordion.Content>

    </Accordion>
    )}
    </Card.Content>
    </Card>
    )
  }
}
  

  export default GoalsCard;
