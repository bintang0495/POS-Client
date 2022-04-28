import * as api from '../api';
import { GET_ADDRESS } from '../constants/actionTypes';

export const getAddress = () => async (dispatch) => {
  try {
    const { data } = await api.fetchAddress();
    dispatch({ type: GET_ADDRESS, data });
  } catch (error) {
    console.log(error);
  }
};
