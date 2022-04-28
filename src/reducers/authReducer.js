import { AUTH, LOGOUT } from '../constants/actionTypes';

const authReducer = (state = { authData: null }, action) => {
  switch (action.Type) {
    case AUTH:
      // localStorage.setItem('profile', JSON.stringify({ ...action?.data }));
      return { ...state, authData: action?.data };
    case LOGOUT:
      return { ...state, authData: null };
    default:
      return state;
  }
};

export default authReducer;
