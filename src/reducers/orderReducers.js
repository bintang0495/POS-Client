import { ADD_ORDER, GET_ORDER_LIST } from '../constants/actionTypes';

export default (order = [], action) => {
  switch (action.type) {
    case ADD_ORDER:
      return [...order, action.data];
    case GET_ORDER_LIST:
      return action.data;
    default:
      return order;
  }
};
