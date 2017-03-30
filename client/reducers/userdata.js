import * as types from '../constants/ActionTypes.jsx';
import _ from 'lodash';

const initialState = {
  signedIn: false,
  username: null,
};

export default function groups(state = initialState, action) {
  switch (action.type) {
    case types.SIGN_IN:
      return {
        ...state,
        signedIn: true,
        username: action.username,
      };
