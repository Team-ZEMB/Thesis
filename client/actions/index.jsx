import axios from 'axios';
import * as types from '../constants/ActionTypes.jsx';

export function signInSuccess(userinfo) {
  var userObj = {
    firstName: userinfo.firstName,
    lastName: userinfo.lastName,
    username: userinfo.username,
    points: userinfo.points,
    profileImage: userinfo.profileImage,
  };
  return {
    type: types.SIGN_IN,
    userObj,
  }
}

export function loading() {
  return {
    type: types.LOADING,
  }
}

export function doneLoading() {
  return {
    type: types.DONE_LOADING,
  }
}

export function signIn() {
  return (dispatch) => {
    dispatch(loading());
    var profile = JSON.parse(localStorage.getItem("profile"));
    var userID = profile.user_id;
    axios.post('/api/users', { params: {
      userID,
      profile,
    }})
    .then((result) => {
      dispatch(signInSuccess(result.data));
    })
  };
}

export function storeProfile(profile) {
  return {
    type: types.STORE_PROFILE,
    profile,
  };
}
