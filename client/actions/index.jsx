import axios from 'axios';
import * as types from '../constants/ActionTypes.jsx';

export function signInSuccess(userinfo) {
  let userObj = {
    firstName: userinfo.firstName,
    lastName: userinfo.lastName,
    username: userinfo.username,
    points: userinfo.points,
    profileImage: userinfo.profileImage,
    badges: userinfo.Badges,
    goals: userinfo.Challenges,
    myPacks: userinfo.Packs,
    history: userinfo.RunHistories,
    DBID: userinfo.id,
  };
  return {
    type: types.SIGN_IN,
    userObj,
  };
}

export function loading() {
  return {
    type: types.LOADING,
  };
}

export function doneLoading() {
  return {
    type: types.DONE_LOADING,
  };
}

export function storeProfile(profile) {
  return {
    type: types.STORE_PROFILE,
    profile,
  };
}

export function hideNavbar() {
  return {
    type: types.HIDE_NAVBAR,
  };
}

export function signIn() {
  return (dispatch) => {
    dispatch(loading());
    let profile = JSON.parse(localStorage.getItem('profile'));
    dispatch(storeProfile(profile));
    let userID = profile.user_id;
    axios.post('/api/users', { params: {
      userID,
      profile,
    } })
    .then((result) => {
      dispatch(signInSuccess(result.data));
    });
  };
}

