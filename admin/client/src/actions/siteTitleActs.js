import api from 'utils/api';
import { ADD_SITE_TITLE, REPLACE_SITE_TITLE, SET_SITE_TITLES, REMOVE_SITE_TITLE } from './types';

export const getAllAct = () => (dispatch) => {
  api
    .get('/siteTitle/getAll')
    .then((res) => {
      dispatch({
        type: SET_SITE_TITLES,
        payload: res.data
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const createAct = (data) => (dispatch) => {
  console.log(data);
  api
    .post('/siteTitle/create', data)
    .then((res) => {
      dispatch({
        type: ADD_SITE_TITLE,
        payload: res.data
      });
      alert('Success!');
    })
    .catch((err) => {
      alert('ERROR!');
    });
};

export const updateOneByIdAct = (_id, data) => (dispatch) => {
  console.log(_id);
  api
    .put(`/siteTitle/updateById/${_id}`, data)
    .then((res) => {
      dispatch({
        type: REPLACE_SITE_TITLE,
        payload: res.data
      });
      alert('Success!');
    })
    .catch((err) => {
      alert('ERROR!');
    });
};

export const deleteOneByIdAct = (_id) => (dispatch) => {
  api
    .delete(`/siteTitle/deleteById/${_id}`)
    .then((res) => {
      dispatch({
        type: REMOVE_SITE_TITLE,
        payload: _id
      });
      alert('Delete Success!');
    })
    .catch((err) => {
      alert('ERROR!');
    });
};

export const updateStatusByIdAct = (_id, status) => (dispatch) => {
  console.log(_id, status);
  api
    .put(`/siteTitle/updateStatusById/${_id}`, { isEnabled: status })
    .then((res) => {
      dispatch({
        type: SET_SITE_TITLES,
        payload: res.data
      });
    })
    .catch((err) => {
      alert('ERROR!');
    });
};
