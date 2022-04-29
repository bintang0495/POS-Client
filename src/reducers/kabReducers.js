import { GET_KAB } from '../constants/actionTypes';

export default (kab = [], action) => {
  switch (action.type) {
    case GET_KAB:
      return action.data;
    default:
      return kab;
  }
};
