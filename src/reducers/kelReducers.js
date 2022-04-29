import { GET_KEL } from '../constants/actionTypes';

export default (kel = [], action) => {
  switch (action.type) {
    case GET_KEL:
      return action.data;
    default:
      return kel;
  }
};
