import * as api from '../api';
import { GET_PRODUCT, GET_TAG, GET_CATEGORY } from '../constants/actionTypes';

export const getProduct = (param) => async (dispatch) => {
  try {
    const { data } = await api.fetchProduct(param);
    dispatch({ type: GET_PRODUCT, payload: data.data });
  } catch (err) {
    console.log(err);
  }
};

export const getCategory = () => async (dispatch) => {
  try {
    const { data } = await api.fetchCategory();
    dispatch({ type: GET_CATEGORY, payload: data });
  } catch (err) {
    console.log(err);
  }
};

export const getTag = (category) => async (dispatch) => {
  try {
    const { data } = await api.fetchTag(category);
    dispatch({ type: GET_TAG, payload: data });
  } catch (err) {
    console.log(err);
  }
};
