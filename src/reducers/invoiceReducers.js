import { GET_INVOICE } from '../constants/actionTypes';

export default (invoice = [], action) => {
  switch (action.type) {
    case GET_INVOICE:
      return action.data;
    default:
      return invoice;
  }
};
