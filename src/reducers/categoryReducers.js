import { GET_CATEGORY } from '../constants/actionTypes';

export default (categories = [], action) => {
  switch (action.type) {
    // case CREATE:
    //   return categories;
    // case UPDATE:
    //   return categories;
    // case DELETE:
    //   return categories;
    case GET_CATEGORY:
      return action.payload;
    default:
      return categories;
  }
};
