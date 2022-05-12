import { CLEAR_CART, GET_KEL } from '../constants/actionTypes';

export default (kel = [], action) => {
  switch (action.type) {
    case GET_KEL:
      return action.data;
    case CLEAR_CART:
      return [];
    default:
      return kel;
  }
};
