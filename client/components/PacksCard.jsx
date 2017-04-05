import React from 'react';
import { Card, Icon, Accordion, Row, Col, Grid, Button, Header, Modal } from 'semantic-ui-react';
import { connect } from 'react-redux';


const addToPack = (packName) => {
    alert(packName)
}

@connect((store) => {
  return {
    userdata: store.userdata,
  };
})

export default class PacksCard extends React.Component {
  state = { modalOpen: false }

  handleOpen = (e) => this.setState({
    modalOpen: true,
  })

  handleClose = (e) => this.setState({
    modalOpen: false,
  })

  render() {
      console.log(this.props)
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
                            <p>This will be form</p>
                            </Modal.Content>
                            <Modal.Actions>
                            <Button color='red'>
                                <Icon name='remove' /> No
                            </Button>
                            <Button color='green'>
                                <Icon name='checkmark' /> Yes
                            </Button>
                            </Modal.Actions>
                        </Modal>
                
                </Card.Meta>
            </Grid.Column>
            </Grid>
        </Card.Header>
        </Card.Content>
        <Card.Content>
        { this.props.userdata.myPacks.map((pack) => {
            return (
                <Accordion>
                    <Accordion.Title>
                    <h5><Icon name="dropdown" />
                    {pack.packName} | <small> {pack.totalDistance}</small></h5>
                    </Accordion.Title>
                    <Accordion.Content>
                        {pack.members.map((member) => {
                            return (
                                <p style={{'textIndent': '2em'}}>
                                  {member}
                                </p>
                            )
                        })}
                        <p style={{'textIndent': '2em'}}>
                          <small><a onClick={() => {addToPack(pack.packName)}}>Invite to Pack</a></small>
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
