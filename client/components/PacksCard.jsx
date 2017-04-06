import React from 'react';
import { Card, Icon, Accordion, Row, Form, Col, Grid, Button, Header, Modal } from 'semantic-ui-react';
import { connect } from 'react-redux';
import axios from 'axios';
import * as UserActions from '../actions';

const addToPack = (packName) => {
    alert(packName)
}

@connect((store) => {
  return {
    userdata: store.userdata,
  };
})

export default class PacksCard extends React.Component {
  state = { 
      modalOpen: false,
      newPackInput: '',
    }

  handleOpen = (e) => this.setState({
    modalOpen: true,
  })

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

  render() {
  return (
    <Card>
        <Card.Content>
        <Card.Header>
            <Grid columns={2}>
            <Grid.Column>
                My Packs
            </Grid.Column>
            <Grid.Column style={{ textAlign: 'right', fontSize: '16' }}>
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
        { this.props.userdata.myPacks.map((pack, idx) => {
            return (
                <Accordion key={idx}>
                    <Accordion.Title>
                    <h5><Icon name="dropdown" />
                    {pack.name} | <small> {pack.totalDistance}</small></h5>
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
                          <small><a onClick={() => {addToPack(<pack className="name"></pack>)}}>Invite to Pack</a></small>
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
