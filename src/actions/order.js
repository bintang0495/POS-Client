import * as api from '../api';
import { ADD_ORDER } from '../constants/actionTypes';

export const addOrder = (formData, history) => async (dispatch) => {
  try {
    console.log('tes');
    const { data } = api.orderItems(formData);
    dispatch({ type: ADD_ORDER, data });
    if (data.error !== 1) {
      history('/invoice');
    }
  } catch (error) {
    console.log(error);
  }
};

export const getOrderItems = (formData, history) => async (dispatch) => {
  try {
    const { data } = api.orderItems(formData);
    dispatch({ type: ADD_ORDER, data });
    if (data.error !== 1) {
      history('/invoice');
    }
  } catch (error) {
    console.log(error);
  }
};
