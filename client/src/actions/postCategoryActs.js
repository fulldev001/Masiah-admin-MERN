import api from 'utils/api';
import { ADD_POST_CATEGORY, REPLACE_POST_CATEGORY, SET_POST_CATEGORIES, REMOVE_POST_CATEGORY } from './types';

export const getAllAct = () => (dispatch) => {
  api
    .get('/postCategory/getAll')
    .then((res) => {
      dispatch({
        type: SET_POST_CATEGORIES,
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
    .post('/postCategory/create', data)
    .then((res) => {
      dispatch({
        type: ADD_POST_CATEGORY,
        payload: res.data
      });
      alert('Success!');
    })
    .catch((err) => {
      alert('ERROR!');
    });
};

export const updateOneByIdAct = (_id, data) => (dispatch) => {
  api
    .put(`/postCategory/updateById/${_id}`, data)
    .then((res) => {
      dispatch({
        type: REPLACE_POST_CATEGORY,
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
    .delete(`/postCategory/deleteById/${_id}`)
    .then((res) => {
      dispatch({
        type: SET_POST_CATEGORIES,
        payload: res.data
      });
      alert('Delete Success!');
    })
    .catch((err) => {
      alert('ERROR!');
    });
};

