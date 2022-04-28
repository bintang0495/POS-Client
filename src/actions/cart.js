import * as api from '../api';
import { GET_CART } from '../constants/actionTypes';

export const getCart = () => async (dispatch) => {
  try {
    const { data } = await api.fetchCart();
    dispatch({ type: GET_CART, data });
  } catch (error) {
    console.log(error);
  }
};

export const patchCart =
  (formData, isInc = true) =>
  async (dispatch) => {
    try {
      const { data } = await api.fetchCart();
      const carts = data;
      let dataProduct = data;
      if (isInc) {
        if (carts.find((cart) => cart.product._id === formData._id)) {
          dataProduct = carts.map((cart) => ({
            product: cart.product,
            qty: cart.product._id === formData._id ? cart.qty + 1 : cart.qty,
          }));
        } else {
          dataProduct = [...dataProduct, { product: formData, qty: 1 }];
        }
      } else {
        if (carts.find((cart) => cart.product._id === formData._id)) {
          dataProduct = carts
            .map((cart) => ({
              product: cart.product,
              qty: cart.product._id === formData._id ? cart.qty - 1 : cart.qty,
            }))
            .filter((cart) => cart.qty > 0);
        }
      }
      await api.updateCart(dataProduct);
      dispatch({ type: GET_CART, data: dataProduct });
    } catch (error) {
      console.log(error);
    }
  };
