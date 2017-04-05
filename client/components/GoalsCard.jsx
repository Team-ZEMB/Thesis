import React from 'react';
import { connect } from 'react-redux';
import { Grid, Row, Col } from 'semantic-ui-react';

@connect((store) => {
  return {
    userdata: store.userdata,
  };
})

class GoalsCard extends React.Component {
  constructor(props) {
    super();
  }

  render() {
    console.log(this.props.userdata.goals);
    return (
      <div>

      {this.props.userdata.goals.map((goal) => {
        if (goal.source === null && goal.status !== 'completed') {
          return <div className="goal">
            <div className="goalText">{"Goal: " + goal.description}</div>
            <div className="completeGoal">✔</div>
          </div>
        } else if (goal.source !== null && goal.status === 'pending') {
          return <div className="pendingChallenge">
            <div className="challengeText">{"Challenge from " + goal.source + ": " + goal.description}</div>
            <div className="acceptChallenge">✔</div>
            <div className="rejectChallenge">✘</div>

          </div>
        } else if (goal.source !== null && goal.status === 'accepted'){
          return <div className="challenge">
            <div className="challengeText">{"Challenge from " + goal.source + ": " + goal.description}</div>
            <div className="completeGoal">✔</div>
          </div>
        }
      })
    }
    </div>
    );
    }
  }

  export default GoalsCard;
