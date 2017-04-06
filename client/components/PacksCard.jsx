import React from 'react';
import { Card, Icon, Accordion, Search, Row, Form, Col, Grid, Button, Segment, Header, Modal } from 'semantic-ui-react';
import { connect } from 'react-redux';
import axios from 'axios';
import * as UserActions from '../actions';
import _ from 'lodash'



// @connect((store) => {
//   return {
//     userdata: store.userdata,
//   };
// })

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
    }

  handleOpen = (e) => this.setState({
    modalOpen: true,
  })
  handleInviteOpen = (id, packName) => {
    this.setState({
      inviteModalOpen: true,
      invitePackID: id,
      invitePackName: packName,
    })
    console.log("ready to get")
    axios.get('/api/getAllUsers')
    .then((results) => {
        console.log(results.data);
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
        this.props.dispatch(UserActions.signIn());
      })
        this.setState({
            newPackInput: '',
            modalOpen: false
        })
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
      console.log(this.state.userlist)
      this.setState({
        filteredUsers: filteredResults,
        isLoading: false,
      })
      console.log(filteredResults)
    }, 500)
  }

  handleInviteSubmit = (e) => {
      axios.post('/api/addToPack', {
        user: this.state.selectedUserID,
        pack: this.state.invitePackID,
      }).then((res) => {
        this.props.dispatch(UserActions.signIn());
      })
        this.setState({
            inviteModalOpen: false,
            inviteInput: '',
            invitePackName: null,
            invitePackID: null,
            selectedUser: null,
            selectedUserID: null,
        })
  }

  render() {
  return (
    <Card>
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
                            <input onChange={(e) => this.handleChange(e)} />
                            
                        <Modal.Actions>
                        <Button type='reset' color='red' onClick={this.handleClose} >
                            <Icon name='remove' /> Cancel
                        </Button>
                        <Button type='submit' color='green'>
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
                <Button type='reset' color='red' onClick={this.handleInviteClose} >
                    <Icon name='remove' /> Cancel
                </Button>
                <Button type='submit' color='green'>
                    <Icon name='checkmark' /> Confirm
                </Button>
                </Modal.Actions>
                </form>
                </Modal.Content>
            </Modal>
        { this.props.userdata.myPacks.map((pack, idx) => {
            return (
                <Accordion key={idx}>
                    <Accordion.Title>
                    <h5><Icon name="dropdown" />
                    {pack.name} | <small> {pack.totalDistance} miles</small></h5>
                    </Accordion.Title>
                    <Accordion.Content>
                        {pack.Users.map((member, idx) => {
                            return (
                                <p key={idx} style={{'textIndent': '2em'}}>
                                  {member.username}
                                </p>
                            )
                        })}
                        <p style={{'textIndent': '2em'}}>
                          <small><a onClick={() => {this.handleInviteOpen(pack.id, pack.name)}}>Invite to Pack</a></small>
                        </p>
                    </Accordion.Content>
                </Accordion>

            )
        })}
        </Card.Content>
    </Card>
    );
  }
};
