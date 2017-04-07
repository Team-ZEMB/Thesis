import React from 'react';
import { Route } from 'react-router';
import Profile from '../pages/Profile';
import Login from '../pages/Login';
import Analytics from '../pages/Analytics';
import RunHistory from '../pages/RunHistory';
import { Menu, Segment } from 'semantic-ui-react';
import { connect } from 'react-redux';

@connect((store) => {
  return {
    userdata: store.userdata,
  };
})

export default class App extends React.Component {
  state = { activeItem: Profile }

  handleItemClick = (e, { name }) => {
    this.setState({ activeItem: name });
  }
  handleLogout = () => {
    localStorage.removeItem('id_token');
    localStorage.removeItem('profile');
    this.setState({ activeItem: 'Login' });
    window.location.href =  '/#/login'
  }

  render() {
    const { activeItem } = this.state
    return (
      <div>
        <Menu pointing secondary>
          <Menu.Item name='Login' active={activeItem === 'Login'} onClick={this.handleItemClick} href='/#/login' />
          <Menu.Item name='Profile' active={activeItem === 'Profile'} onClick={this.handleItemClick} href='/#/profile' />
          <Menu.Item name='Run History' active={activeItem === 'Run History'} onClick={this.handleItemClick} href='/#/runhistory' />
          <Menu.Item name='Analytics' active={activeItem === 'Analytics'} onClick={this.handleItemClick} href='/#/analytics' />
          <Menu.Menu position='right'>
            <img id="profilePic" src={this.props.userdata.profileImage} alt="profile picture" />
            <Menu.Item name='logout' active={activeItem === 'logout'} onClick={this.handleLogout} />
          </Menu.Menu>
        </Menu>
        <Route exact path="/" component={Profile} />
        <Route path="/profile" component={Profile} />
        <Route path="/login" component={Login} />
        <Route path="/analytics" component={Analytics} />
        <Route path="/runhistory" component={RunHistory} />
      </div>
    );
  }
}

