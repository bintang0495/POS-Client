import * as api from '../api';
import { AUTH, LOGOUT } from '../constants/actionTypes';

export const signin =
  (formData, history, setAlertMessage) => async (dispatch) => {
    try {
      const { data } = await api.signIn(formData);
      dispatch({ type: AUTH, data });

      if (data.error !== 1) {
        localStorage.setItem('profile', JSON.stringify(data));
        setAlertMessage({
          severity: 'success',
          message: 'Login berhasil!',
        });
        history('/');
      } else
        setAlertMessage({
          severity: 'error',
          message: data.message,
        });
    } catch (error) {
      setAlertMessage({
        severity: 'error',
        message: error.message,
      });
    }
  };

export const signup = (formData, setAlertMessage) => async (dispatch) => {
  try {
    const { data } = await api.signUp(formData);
    dispatch({ type: AUTH, data });
    if (data.error !== 1)
      setAlertMessage({
        severity: 'success',
        message: 'Sign up berhasil, silahkan login',
      });
  } catch (error) {
    setAlertMessage({
      severity: 'error',
      message: error.message,
    });
  }
};

export const logout = (history) => async (dispatch) => {
  try {
    const { data } = await api.signOut();
    dispatch({ type: LOGOUT });
    localStorage.clear();
    if (data.error === 0) history('/');
  } catch (err) {
    console.log(err);
  }
};
