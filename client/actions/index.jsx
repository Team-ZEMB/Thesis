import axios from 'axios';
import * as types from '../constants/ActionTypes.jsx';

export function signIn() {
  return {
    type: types.SIGN_IN,
    username: 'test',
  };
}
