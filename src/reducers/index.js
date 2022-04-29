import { combineReducers } from 'redux';
import authReducer from './authReducer';
import productReducers from './productReducers';
import categoryReducers from './categoryReducers';
import tagReducers from './tagReducers';
import cartReducers from './cartReducers';
import provReducers from './provReducers';
import kabReducers from './kabReducers';
import kecReducers from './kecReducers';
import kelReducers from './kelReducers';

export default combineReducers({
  authReducer,
  productReducers,
  categoryReducers,
  tagReducers,
  cartReducers,
  provReducers,
  kabReducers,
  kecReducers,
  kelReducers,
});
