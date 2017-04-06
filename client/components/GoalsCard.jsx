import React from 'react';
import { connect } from 'react-redux';
import { Grid, Row, Col, Accordion, Icon } from 'semantic-ui-react';
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
      userInput: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.completedGoal = this.completedGoal.bind(this);
  }

  handleChange(event) {
    this.setState({userInput: event.target.value});
  }

  addGoal(user, input) {
    if (input.length > 1) {
      axios.post('/api/goals', {
        UserId: user,
        description: input, 
        status: 'accepted'
      })
      .then((res) => {
        console.log("Saved goal");
      })
      .catch(err => console.log(err))
    }
  }

  acceptChallenge(id) {
    axios.put('/api/goals', {
      id: id,
      status: 'accepted'
    })
    .then((res) => {
      console.log("updated goal");
    })
    .catch(err => console.log(err))
  }

  rejectChallenge(id) {
    axios.request({
      url: '/api/goals',
      method: 'delete',
      data: { id: id }
    });
  }

  completedGoal(id) {
    axios.put('/api/goals', {
      id: id,
      status: 'completed'
    })
    .then((res) => {
      console.log("updated goal");
    })
    .catch(err => console.log(err))
  }

  render() {
    return (
      <div>

      {this.props.userdata.goals.map((goal, idx) => {
      var goalId = goal.id;
        if (goal.source === null && goal.status !== 'completed') {
          return <div className="goal" key={idx}>
          <Grid>
            <Grid.Row>
              <div className="goalText">{"Goal: " + goal.description}</div>
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
        }
      })
    }
    <div className="ui large icon input">
      <input type="text" placeholder="Add new goal" value={this.state.userInput} onChange={this.handleChange}/>
      <div className="ui button" onClick={() => {this.addGoal(this.props.userdata.DBID, this.state.userInput)}}>Submit</div>
    </div>

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

    </div>

    );
    }
  }

  export default GoalsCard;
