import { combineReducers } from 'redux';
import authReducer from './authReducer';
import productReducers from './productReducers';
import categoryReducers from './categoryReducers';
import tagReducers from './tagReducers';
import cartReducers from './cartReducers';

export default combineReducers({
  authReducer,
  productReducers,
  categoryReducers,
  tagReducers,
  cartReducers,
});
