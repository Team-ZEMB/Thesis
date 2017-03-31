import Auth0Lock from 'auth0-lock'
import config from '../../environment';

class AuthService {
  constructor(clientId, domain) {
    // Configure Auth0
    this.lock = new Auth0Lock(config.AUTH_ID, config.AUTH_CLIENT)
  
    // Add callback for lock `authenticated` event
    var self = this;
    this.lock.on("authenticated", (authResult) => {
      // Use the token in authResult to getUserInfo() and save it to localStorage
      console.log(authResult)
      console.log(window.location);
      self.lock.getUserInfo(authResult.accessToken, function(error, profile) {
        if (error) {
          // Handle error
          return;
        }
        console.log(profile);
        localStorage.setItem('accessToken', authResult.accessToken);
        localStorage.setItem('profile', JSON.stringify(profile));
      });
    });

    // this.lock.on('authenticated', this._doAuthentication.bind(this))
    // binds login functions to keep this context
    this.login = this.login.bind(this)
  }

  _doAuthentication(authResult) {
    // Saves the user token
    this.setItem('token', "JSON.stringify(authResult.idToken)")
    localStorage.setItem('profile', JSON.stringify(authResult.profile))
    // navigate to the home route
    window.location.href = '/#/profile/';
  }

  login() {
    // Call the show method to display the widget.
    this.lock.show((err, profile, token) => {
      alert('here')
      if (err) {
        lockError(err);
      }
      console.log('eyyyyy')
      console.log(profile)
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

export default new AuthService(config.AUTH_ID, config.AUTH_CLIENT)