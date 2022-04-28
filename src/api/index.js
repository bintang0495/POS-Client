import axios from 'axios';
import { urlServer } from '../constants/urlServer';

const API = axios.create({ baseURL: urlServer });
API.interceptors.request.use((req) => {
  if (localStorage.getItem('profile')) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem('profile')).token
    }`;
  }
  return req;
});

export const fetchProduct = (params) => API.get('/products', { params });
export const fetchCategory = () => API.get('/categories');
export const fetchTag = (category) => API.get(`/tags/${category}`);

export const signIn = (formData) => API.post('/auth/login', formData);
export const signUp = (formData) => API.post('/auth/register', formData);
export const signOut = () => API.post('/auth/logout');

export const updateCart = (formData) => API.put('/carts', { items: formData });
export const fetchCart = () => API.get('/carts');

export const fetchAddress = () => API.get('/delivery-addresses');
export const addAddress = (formData) =>
  API.put('/delivery-addresses', formData);
export const getLocation = (lokasi, kodeInduk) =>
  API.get(
    `https://regions-indoneisa.herokuapp.com/api/${lokasi}?kode_induk=${kodeInduk}`
  );
