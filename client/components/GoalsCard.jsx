import React from 'react';
import { connect } from 'react-redux';
import { Grid, Row, Col, Accordion, Icon, Card, Header, Segment, Dimmer, Loader } from 'semantic-ui-react';
import axios from 'axios';

@connect((store) => {
  return {
    userdata: store.userdata,
  };
})

class GoalsCard extends React.Component {
  constructor(props) {
    super();
    this.state = {
      userInput: '',
      goals: null
    }
    this.handleChange = this.handleChange.bind(this);
    this.completedGoal = this.completedGoal.bind(this);
    this.addGoal = this.addGoal.bind(this);
    this.acceptChallenge = this.acceptChallenge.bind(this);
    this.rejectChallenge = this.rejectChallenge.bind(this);
  }

  componentWillReceiveProps(props) {
    this.setState({goals: props.userdata.goals})
  }

  componentWillMount() {
    if (!!this.props.userdata.DBID) {
      this.setState({goals: this.props.userdata.goals})
    }
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
        var nextGoalId = (that.state.goals[that.state.goals.length-1].id) + 1;
        var goalsCopy = that.state.goals.slice();
        goalsCopy.push({
          UserId: that.props.userdata.DBID, 
          id: nextGoalId, 
          status: 'accepted',
          description: input,
          source: null
        });
        that.setState({goals: goalsCopy, userInput: ''});
      })
      .catch(err => console.log(err));
    }
  }

  acceptChallenge(id) {
    var that = this;
    axios.put('/api/goals', {
      id: id,
      status: 'accepted'
    })
    .then((res) => {
      var goalsCopy = that.state.goals.slice();
      for (var i = 0; i < goalsCopy.length; i++) {
        if (goalsCopy[i].id === id) {
          goalsCopy[i].status = 'accepted'
        }
      }
      that.setState({goals: goalsCopy});
    })
    .catch(err => console.log("Unable to process request"))
  }

  rejectChallenge(id) {
    var that = this;
    axios.request({
      url: '/api/goals',
      method: 'delete',
      data: { id: id }
    }).then((res) => {
      var goalsCopy = that.state.goals.slice();
      for (var i = 0; i < goalsCopy.length; i++) {
        if (goalsCopy[i].id === id) {
          goalsCopy.splice(i, 1);
        }
      }
      that.setState({goals: goalsCopy});
    })
  }

  completedGoal(id) {
    var that = this;
    axios.put('/api/goals', {
      id: id,
      status: 'completed'
    })
    .then((res) => {
      var goalsCopy = that.state.goals.slice();
      for (var i = 0; i < goalsCopy.length; i++) {
        if (goalsCopy[i].id === id) {
          goalsCopy[i].status = 'completed'
        }
      }
      that.setState({goals: goalsCopy});
    })
    .catch(err => console.log("Unable to process request"))
  }

  render() {
    return (
    <Card className="teal">
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
      { !this.state.goals ? (<Segment>
                <Dimmer active inverted>
                <Loader size="small">Loading</Loader>
                </Dimmer><br /><br /><br /><br />
            </Segment>) : ( this.state.goals.map((goal, idx) => {
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
    { !this.state.goals ? (<div></div>) : (
    <div className="ui small icon input">
      <input type="text" placeholder="Add new goal" value={this.state.userInput} onChange={this.handleChange}/>
      <div className="ui small button" onClick={() => {this.addGoal(this.props.userdata.DBID, this.state.userInput)}}>Submit</div>
    </div>
    )}
    { !this.state.goals ? (<div></div>) : (
    <Accordion className="completedGoals">

      <Accordion.Title>
        <Icon name="dropdown" /> completed goals and challenges
      </Accordion.Title>

      <Accordion.Content className="accContent">
        {
          this.state.goals.map((goal, idx) => { 
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
