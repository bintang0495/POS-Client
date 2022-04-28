import { GET_TAG } from '../constants/actionTypes';

export default (tags = [], action) => {
  switch (action.type) {
    // case CREATE:
    //   return tags;
    // case UPDATE:
    //   return tags;
    // case DELETE:
    //   return tags;
    case GET_TAG:
      return action.payload;
    default:
      return tags;
  }
};
