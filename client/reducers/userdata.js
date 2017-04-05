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
  myPacks: [
    {
      packName: 'Megazord',
      members: ['Sandra', 'Alex', 'Emily'],
      image: null,
      totalDistance: "1000 miles",
    },
    {
      packName: 'mexicanfreetailedbat.io',
      members: ['Squishmaster', 'Assistant to the project manager'],
      image: null,
      totalDistance: "0 miles",
    },
  ], 
  badges: [{ image: '10goals.png', description: 'achieved 10 goals' }, { image: '50miles.png', description: 'ran 50 miles' }],
  goals: [
    { source: null, description: 'this is a goal for my own important self', status: 'accepted' },
    { source: 'Marcie', description: 'Fly to the moon in your undies', status: 'completed' },
    { source: 'Brandon', description: 'Talk Emily out of running for two weeks', status: 'pending' },
    { source: 'Zach', description: 'Do more pushups than Andrew', status: 'accepted' },
  ],
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
