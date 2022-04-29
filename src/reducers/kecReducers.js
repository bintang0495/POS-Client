import { GET_KEC } from '../constants/actionTypes';

export default (kec = [], action) => {
  switch (action.type) {
    case GET_KEC:
      return action.data;
    default:
      return kec;
  }
};
