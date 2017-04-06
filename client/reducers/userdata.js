import * as types from '../constants/ActionTypes.jsx';
import _ from 'lodash';

const initialState = {
  signedIn: false,
  username: null,
  profile: null,
  loading: false,
  profileImage: null,
  points: 0,
  firstName: null,
  lastName: null,
  myPacks: [],
  badges: [],
  goals: [],
  history: [],
  DBID: null,
};

export default function groups(state = initialState, action) {
  switch (action.type) {
    case types.SIGN_IN:
      return {
        ...state,
        signedIn: true,
        firstName: action.userObj.firstName,
        lastName: action.userObj.lastName,
        username: action.userObj.username,
        points: action.userObj.points,
        profileImage: action.userObj.profileImage,
        myPacks: action.userObj.myPacks,
        badges: action.userObj.badges,
        goals: action.userObj.goals,
        history: action.userObj.history,
        DBID: action.userObj.DBID,
      };

    case types.STORE_PROFILE:
      return {
        ...state,
        signedIn: true,
        profile: action.profile,
      };
    case types.LOADING:
      return {
        ...state,
        loading: true,
      };
    case types.DONE_LOADING:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
}
