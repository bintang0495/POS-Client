import * as api from '../api';
import {
  ADD_ORDER,
  GET_INVOICE,
  GET_ORDER_LIST,
} from '../constants/actionTypes';

export const addOrder = (formData, history) => async (dispatch) => {
  try {
    const { data } = await api.orderItems(formData);

    dispatch({ type: ADD_ORDER, data });
    if (data.error !== 1) {
      history(`/invoice/${data._id}`);
    }
  } catch (error) {
    console.log(error);
  }
};

export const getOrderItems = (param) => async (dispatch) => {
  try {
    const { data } = await api.getOrderLIst(param);
    dispatch({ type: GET_ORDER_LIST, data });
  } catch (error) {
    console.log(error);
  }
};

export const getInvoice = (id) => async (dispatch) => {
  try {
    const { data } = await api.getInvoice(id);
    dispatch({ type: GET_INVOICE, data });
  } catch (error) {
    console.log(error);
  }
};
