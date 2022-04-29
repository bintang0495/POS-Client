import { GET_PROVINSI } from '../constants/actionTypes';

export default (prov = [], action) => {
  switch (action.type) {
    case GET_PROVINSI:
      return action.data;
    default:
      return prov;
  }
};
