import { GET_ADDRESS } from '../constants/actionTypes';

export default (carts = [], action) => {
  switch (action.type) {
    case GET_ADDRESS:
      return action.data;
    default:
      return carts;
  }
};
