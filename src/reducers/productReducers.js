import { GET_PRODUCT } from '../constants/actionTypes';

export default (products = [], action) => {
  switch (action.type) {
    // case CREATE:
    //   return products;
    // case UPDATE:
    //   return products;
    // case DELETE:
    //   return products;
    case GET_PRODUCT:
      return action.payload;
    default:
      return products;
  }
};
