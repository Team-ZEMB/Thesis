import React from 'react';
import { Card, Icon, Accordion, Row, Col, Grid } from 'semantic-ui-react';
import { connect } from 'react-redux';


const newPackModal = () => {
    alert("new pack")
};

@connect((store) => {
  return {
    userdata: store.userdata,
  };
})

export default class PacksCard extends React.Component {
  
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
                <span className="date" onClick={() => { newPackModal(); }}>
                    (+)
                    </span>
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
                    <Icon name="dropdown" />
                    {pack.packName}
                    </Accordion.Title>
                    <Accordion.Content>
                        {pack.members.map((member) => {
                            return (
                                <p>
                                    {member}
                                </p>
                            )
                        })}
                    </Accordion.Content>
                </Accordion>

            )
        })}
        </Card.Content>
    </Card>
    );
  }
};
