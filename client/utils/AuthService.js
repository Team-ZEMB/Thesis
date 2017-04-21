import Auth0Lock from 'auth0-lock';
import config from '../../environment';
import { connect } from 'react-redux';
import rabbitLogo from '../../output/assets/rabbitlogo.png';


class AuthService {
  constructor(clientId, domain) {
    // Configure Auth0
    this.lock = new Auth0Lock(config.AUTH_ID, config.AUTH_CLIENT, {
      theme: {
        logo: rabbitLogo,
        primaryColor: '#727070',
      },
      languageDictionary: {
        title: 'Rabbit Fitness',
      },
    });

    // Add callback for lock `authenticated` event
    var self = this;
    this.lock.on("authenticated", (authResult) => {
      // Use the token in authResult to getUserInfo() and save it to localStorage
      self.lock.getUserInfo(authResult.accessToken, function(error, profile) {
        if (error) {
          // Handle error
          return;
        }
        localStorage.setItem('accessToken', authResult.accessToken);
        localStorage.setItem('profile', JSON.stringify(profile));
        window.location.href = '/#/profile/';
      });
    });

    this.login = this.login.bind(this)
  }

  _doAuthentication(authResult) {
    this.setItem('token', "JSON.stringify(authResult.idToken)")
    localStorage.setItem('profile', JSON.stringify(authResult.profile))
    window.location.href = '/#/profile/';
  }

  login() {
    this.lock.show((err, profile, token) => {
      alert('here')
      if (err) {
        lockError(err);
      }
    })
  }

  loggedIn() {
    // Checks if there is a saved token and it's still valid
    return !!this.getToken()
  }

  setToken(idToken) {
    // Saves user token to local storage
    localStorage.setItem('id_token', idToken)
  }

  getToken() {
    // Retrieves the user token from local storage
    return localStorage.getItem('id_token')
  }

  logout() {
    // Clear user token and profile data from local storage
    localStorage.removeItem('id_token');
  }
}

// const options = {
//   theme: {
//     logo: 'http://i.imgur.com/qlpg0K4.png',
//     primaryColor: '#31324F',
//   }
// }

export default new AuthService(config.AUTH_ID, config.AUTH_CLIENT)