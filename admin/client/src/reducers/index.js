import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import blogReducer from './blogRed';
import footerContentReducer from './footerContentRed';
import logoReducer from './logoRed';
import postCategoryReducer from './postCategoryRed';
import siteTitleReducer from './siteTitleRed';

export default combineReducers({
  alert,
  auth,
  blog: blogReducer,
  logo: logoReducer,
  siteTitle: siteTitleReducer,
  footerContent: footerContentReducer,
  postCategory: postCategoryReducer
});
