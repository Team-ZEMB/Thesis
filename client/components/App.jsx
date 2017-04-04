import React from 'react';
import { Route } from 'react-router';
import Profile from '../pages/Profile';
import Login from '../pages/Login';
import Analytics from '../pages/Analytics';
import { Menu, Segment } from 'semantic-ui-react';

export default class App extends React.Component {
  state = { activeItem: Profile }

  handleItemClick = (e, { name }) => {
    this.setState({ activeItem: name });
    console.log(this.state.activeItem);
  }

  render() {
    const { activeItem } = this.state
    return (
      <div>
        <Menu pointing secondary>
          <Menu.Item name='Login' active={activeItem === 'Login'} onClick={this.handleItemClick} href='/#/login' />
          <Menu.Item name='Profile' active={activeItem === 'Profile'} onClick={this.handleItemClick} href='/#/profile' />
          <Menu.Item name='Analytics' active={activeItem === 'Analytics'} onClick={this.handleItemClick} href='/#/analytics' />
          <Menu.Menu position='right'>
            <Menu.Item name='logout' active={activeItem === 'logout'} onClick={this.handleItemClick} />
          </Menu.Menu>
        </Menu>
        <Route exact path="/" component={Profile} />
        <Route path="/profile" component={Profile} />
        <Route path="/login" component={Login} />
        <Route path="/analytics" component={Analytics} />
      </div>
    );
  }
}

