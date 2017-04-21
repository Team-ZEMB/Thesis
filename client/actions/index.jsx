import axios from 'axios';
import * as types from '../constants/ActionTypes.jsx';

export function signInSuccess(userinfo) {
  const userObj = {
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
    machineGoal: userinfo.machineGoal,
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

export function newMLGoal(goal) {
  console.log("GOAL",goal)
  return {
    type: types.NEW_ML,
    goal,
  };
}

export function updateMlGoal(results) {
  return (dispatch) => {
    if ((((Date.now() - new Date(results.lastMachineGoal)) / (1000 * 60 * 60 * 24) > 7) || results.lastMachineGoal === null) && results.RunHistories.length >= 5) {
      console.log('action 60')
        axios.post('/api/machineGoal', {
            UserId: results.id,
        })
        .then((res)  => {
          console.log('action 65')
            if (res.data === 'Under 7 days') {
              // do nothing
            } else {
              console.log('action 69')
                dispatch(newMLGoal(res.data))
            }
        })
        .catch(err => console.log(err))

    } else {
      // Not necessary to update machine goal
    }
  };
}

export function signIn() {
  return (dispatch) => {
    dispatch(loading());
    const profile = JSON.parse(localStorage.getItem('profile'));
    dispatch(storeProfile(profile));
    const userID = profile.user_id;
    axios.post('/api/users', { params: {
      userID,
      profile,
    } })
    .then((result) => {
      dispatch(signInSuccess(result.data));
      dispatch(updateMlGoal(result.data));
    });
  };
}

