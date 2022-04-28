import { GET_CART } from '../constants/actionTypes';

export default (carts = [], action) => {
  switch (action.type) {
    case GET_CART:
      return action.data;
    default:
      return carts;
  }
};
