import * as api from '../api';
import {
  GET_ADDRESS,
  GET_KAB,
  GET_KEC,
  GET_KEL,
  GET_PROVINSI,
} from '../constants/actionTypes';
import { getKode } from '../utils';

export const getAddress = () => async (dispatch) => {
  try {
    const { data } = await api.fetchAddress();
    dispatch({ type: GET_ADDRESS, data });
  } catch (error) {
    console.log(error);
  }
};

export const addAddress = (formData, setErrMsg) => async (dispatch) => {
  try {
    const { data } = await api.addAddress(formData);
    if (data.error === 1) {
      setErrMsg(data.message);
    } else {
      setErrMsg('Berhasil menambahkan alamat');
    }
    dispatch({ type: GET_ADDRESS, data });
  } catch (error) {
    setErrMsg(error);
  }
};

export const updateAddress = (formData, id, setErrMsg) => async (dispatch) => {
  try {
    const { data } = await api.updateAddress(formData, id);
    if (data.error === 1) {
      setErrMsg(data.message);
    } else {
      setErrMsg('Berhasil mengupdate alamat');
    }
    dispatch({ type: GET_ADDRESS, data });
  } catch (error) {
    setErrMsg(error);
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
  (lokasi = 'kecamatan', kodeInduk, selectedKec = '', setKec = null) =>
  async (dispatch) => {
    try {
      const { data } = await api.getLocation(lokasi, kodeInduk);
      if (selectedKec !== '') setKec(getKode(selectedKec, data).kode);
      dispatch({ type: GET_KEC, data });
    } catch (error) {
      console.log(error);
    }
  };

export const getKabupaten =
  (lokasi = 'kabupaten', kodeInduk, selectedKab = '', setKab = null) =>
  async (dispatch) => {
    try {
      const { data } = await api.getLocation(lokasi, kodeInduk);
      if (selectedKab !== '') {
        setKab(getKode(selectedKab, data).kode);
      }
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
