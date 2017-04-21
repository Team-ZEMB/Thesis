import React from 'react';
import { Card, Icon, Dimmer, Loader, Accordion, Search, Row, Form, Col, Grid, Button, Segment, Header, Modal } from 'semantic-ui-react';
import { connect } from 'react-redux';
import axios from 'axios';
import * as UserActions from '../actions';
import _ from 'lodash'

@connect((store) => {
  return {
    userdata: store.userdata,
  };
})

export default class PacksCard extends React.Component {
  state = { 
      modalOpen: false,
      newPackInput: '',
      inviteInput: '',
      invitePackName: null,
      invitePackID: null,
      inviteModalOpen: false,
      isLoading: false,
      userlist: [],
      filteredUsers: [],
      selectedUser: null,
      selectedUserID: null,
      challengeText: '',
      challenger: '',
      challengee: '',
      challengeModalOpen: false,
      challengeeName: '',
      packs: null,
      packIndex: ''
    }

  componentWillReceiveProps(props) {
    setTimeout(() => {
      this.setState({packs: props.userdata.myPacks})
    }, 0);
  }
  componentWillMount() {
    
    if (!!this.props.userdata.DBID) {
      this.setState({packs: this.props.userdata.myPacks})
    }
  }

  handleOpen = (e) => this.setState({
    modalOpen: true,
  })

  handleInviteOpen = (id, packName, idx) => {
    this.setState({
      inviteModalOpen: true,
      invitePackID: id,
      invitePackName: packName,
      packIndex: idx
    })
    axios.get('/api/getAllUsers')
    .then((results) => {
        this.setState({
            userlist: results.data,
        })
    })
  }

  handleResultSelect = (e, result) => {
    this.setState({
      selectedUser: result.title,
      selectedUserID: result.id,
    })
  }

  handleClose = (e) => this.setState({
    modalOpen: false,
  })

  handleChange = (e) => this.setState({
    newPackInput: e.target.value
  })

  handleSubmit = (e) => {
    var newPackName = this.state.newPackInput;
    axios.post('/api/newPack', {
       user: this.props.userdata.DBID,
       newPackName,
    }).then((res) => {
      var packsCopy = this.state.packs.slice();
      packsCopy.push({
        Users: [{
          Users_Packs: {UserId: this.props.userdata.DBID},
          username: this.props.userdata.username
        }],
        name: newPackName,
        id: (this.state.packs[this.state.packs.length-1].id) + 1,
        totalDistance: 0,
        Users_Packs: {UserId: this.props.userdata.DBID, PackId: (this.state.packs[this.state.packs.length-1].id) + 1}
      });
      this.setState({packs: packsCopy});
     })
     this.setState({newPackInput: '', modalOpen: false});
  }

  handleInviteClose = (e) => this.setState({
    inviteModalOpen: false,
    inviteInput: '',
    invitePackName: null,
    invitePackID: null,
    selectedUser: null,
    selectedUserID: null,
  })

  handleInviteChange = (e) => {
    this.setState({
      inviteInput: e.target.value,
      isLoading: true,
    })
    setTimeout(() => {
      if (this.state.inviteInput.length < 1) {
        this.setState({
          isLoading: false,
        })
      }
      const re = new RegExp(_.escapeRegExp(this.state.inviteInput), 'i')
      const isMatch = (result) => re.test(result.title)
      var filteredResults = _.filter(this.state.userlist, isMatch)
      this.setState({
        filteredUsers: filteredResults,
        isLoading: false,
      })
    }, 500)
  }

  handleInviteSubmit = (e) => {
    var packsCopy = this.state.packs.slice();
    packsCopy[this.state.packIndex].Users.push(
      {Users_Packs: {confirmed: "FALSE", UserId: this.state.selectedUserID, PackId: this.state.packIndex},
      username: this.state.selectedUser
    })
    this.setState({packs: packsCopy});

      axios.post('/api/addToPack', {
        user: this.state.selectedUserID,
        pack: this.state.invitePackID,
        self: this.props.userdata.DBID,
      }).then((res) => {

      })
        this.setState({
            inviteModalOpen: false,
            inviteInput: '',
            invitePackName: null,
            invitePackID: null,
            selectedUser: null,
            selectedUserID: null,
            packIndex: ''
        })
  }

  handleChallengeOpen = (id, name, challenger) => {
    this.setState({
      challengeModalOpen: true,
      challengee: id,
      challengeeName: name,
      challenger: challenger,
    })
  }

  handleChallengeClose = (e) => this.setState({
      challengeText: '',
      challenger: '',
      challengee: '',
      challengeModalOpen: false
  })

  handleChallengeText = (e) => {
      this.setState({
        challengeText: e.target.value,
      })
  }

  createChallenge = () => {
    var that = this;
    this.handleChallengeClose();
    if (this.state.challengeText.length > 0) {
      axios.post('/api/goals', {
        UserId: that.state.challengee,
        source: that.state.challenger,
        description: that.state.challengeText, 
        status: 'pending'
      })
      .then((res) => {
        that.setState({challengeText: ''});
      })
      .catch(err => console.log('Unable to process request'))
    }
  }

  render() {
    return (
    <Card className="teal">
        <Card.Content>
        <Card.Header>
            <Grid columns={2}>
            <Grid.Column>
                My Packs
            </Grid.Column>
            <Grid.Column style={{ textAlign: 'right', fontSize: 16 }}>
                <Card.Meta>
                    <span onClick={this.handleOpen} className="date" >(+)</span> 
                        <Modal open={this.state.modalOpen} onClose={this.handleClose} closeIcon='close'>
                        <Header icon='users' content='Create New Pack' />
                        <Modal.Content>
                            <form onSubmit={() => {this.handleSubmit()}}>
                            
                            <label>Name:</label>
                            <input className="modalInput" onChange={(e) => this.handleChange(e)} />
                            
                        <Modal.Actions>
                        <Button type='reset' onClick={this.handleClose} >
                            <Icon name='remove' /> Cancel
                        </Button>
                        <Button type='submit' color='teal'>
                            <Icon name='checkmark' /> Confirm
                        </Button>
                        </Modal.Actions>
                        </form>
                        </Modal.Content>
                    </Modal>
                </Card.Meta>
            </Grid.Column>
            </Grid>
        </Card.Header>
        </Card.Content>
        <Card.Content>
            <Modal open={this.state.inviteModalOpen} onClose={this.handleInviteClose} closeIcon='close'>
                <Header icon='users' content={'Invite to '+this.state.invitePackName} />
                <Modal.Content>
                    <form onSubmit={() => {this.handleInviteSubmit()}}>
                    <label>Search by name:</label>
                    <Search
                        loading={this.state.isLoading}
                        onResultSelect={this.handleResultSelect}
                        onSearchChange={this.handleInviteChange}
                        results={this.state.filteredUsers}
                        value={this.state.inviteInput}
                        />
                        <br />
                        {this.state.selectedUser !== null ? (<Segment raised>{"Selected: "+this.state.selectedUser}</Segment>):(<div><br /><br /></div>)}
                        <br />
                        <br />
                        <br />
                        <br />
                <Modal.Actions>
                <Button type='reset' onClick={this.handleInviteClose} >
                    <Icon name='remove' /> Cancel
                </Button>
                <Button type='submit' color='teal'>
                    <Icon name='checkmark' /> Confirm
                </Button>
                </Modal.Actions>
                </form>
                </Modal.Content>
            </Modal>
        { !this.state.packs ? (<Segment>
      <Dimmer active inverted>
        <Loader size='small'>Loading</Loader>
      </Dimmer><br /><br /><br /><br />
    </Segment>) :  (this.state.packs.map((pack, idx) => {
      if (pack.Users_Packs.confirmed === "TRUE") {
            return (
                <Accordion key={idx}>
                    <Accordion.Title>
                    <h5><Icon name="dropdown" />
                    {pack.name} | <small> {pack.totalDistance.toFixed(2)} miles</small></h5>
                    </Accordion.Title>
                    <Accordion.Content>
                        {pack.Users.map((member, idx) => {
                          if (this.props.userdata.firstName) {
                            var challengerName = this.props.userdata.firstName;
                          } else {
                            var challengerName = this.props.userdata.username;
                          }
                          if (member.Users_Packs.UserId === this.props.userdata.DBID) {
                            return;
                          } else if (member.Users_Packs.confirmed === "TRUE") {
                            return (
                                <p id="packmates" key={idx} style={{'textIndent': '2em'}} onClick={() => {this.handleChallengeOpen(member.Users_Packs.UserId, member.username, challengerName)}}>
                                  {member.username}
                                </p>
                            )
                          } else {
                              return (
                                <p id="pendingPackmates" key={idx} style={{'textIndent': '2em'}}>
                                  {member.username + " (pending)"}
                                </p>
                            )
                          }
                        })}
                        <Modal open={this.state.challengeModalOpen} onClose={this.handleChallengeClose} closeIcon='close'>
                        <Header icon='users' content='Send a challenge' />
                        <Modal.Content>
                            <form onSubmit={this.createChallenge}>
                            <label>{'I challenge ' + this.state.challengeeName + ' to: '}</label>
                            <input className="modalInput" onChange={(e) => this.handleChallengeText(e)} />
                            
                        <Modal.Actions>
                        <Button type='reset' onClick={this.handleChallengeClose} >
                            <Icon name='remove' /> Cancel
                        </Button>
                        <Button type='submit' color='teal' >
                            <Icon name='checkmark' /> Send
                        </Button>
                        </Modal.Actions>
                        </form>
                        </Modal.Content>
                    </Modal>
                        <p style={{'textIndent': '2em'}}>
                          <small><a onClick={() => {this.handleInviteOpen(pack.id, pack.name, idx)}}>Invite New Packmate</a></small>
                        </p>
                    </Accordion.Content>
                </Accordion>
            )}
        }))}
        </Card.Content>
    </Card>
    )
  }
};