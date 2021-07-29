import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import blogRed from './blogRed';

export default combineReducers({
  alert,
  auth,
  blog: blogRed
});
