import * as api from '../api';
import {
  GET_ADDRESS,
  GET_KAB,
  GET_KEC,
  GET_KEL,
  GET_PROVINSI,
} from '../constants/actionTypes';

export const getAddress = () => async (dispatch) => {
  try {
    const { data } = await api.fetchAddress();
    dispatch({ type: GET_ADDRESS, data });
  } catch (error) {
    console.log(error);
  }
};

export const getProvinsi = () => async (dispatch) => {
  try {
    const { data } = await api.getLocation('provinsi', '');
    // localStorage.setItem('provinsi', JSON.stringify(data));
    dispatch({ type: GET_PROVINSI, data });
  } catch (error) {
    console.log(error);
  }
};

export const getKecamatan =
  (lokasi = 'kecamatan', kodeInduk) =>
  async (dispatch) => {
    try {
      const { data } = await api.getLocation(lokasi, kodeInduk);
      dispatch({ type: GET_KEC, data });
    } catch (error) {
      console.log(error);
    }
  };

export const getKabupaten =
  (lokasi = 'kabupaten', kodeInduk) =>
  async (dispatch) => {
    try {
      const { data } = await api.getLocation(lokasi, kodeInduk);
      // localStorage.setItem('kabupaten', JSON.stringify(data));
      dispatch({ type: GET_KAB, data });
    } catch (error) {
      console.log(error);
    }
  };

export const getKel =
  (lokasi = 'kelurahan', kodeInduk) =>
  async (dispatch) => {
    try {
      const { data } = await api.getLocation(lokasi, kodeInduk);
      dispatch({ type: GET_KEL, data });
    } catch (error) {
      console.log(error);
    }
  };
