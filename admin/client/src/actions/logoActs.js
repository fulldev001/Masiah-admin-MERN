import api from 'utils/api';
import { ADD_LOGO, REPLACE_LOGO, SET_LOGOS, REMOVE_LOGO } from './types';

export const getAllAct = () => (dispatch) => {
  api
    .get('/logo/getAll')
    .then((res) => {
      dispatch({
        type: SET_LOGOS,
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
    .post('/logo/create', data)
    .then((res) => {
      dispatch({
        type: ADD_LOGO,
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
    .put(`/logo/updateById/${_id}`, data)
    .then((res) => {
      dispatch({
        type: REPLACE_LOGO,
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
    .delete(`/logo/deleteById/${_id}`)
    .then((res) => {
      dispatch({
        type: REMOVE_LOGO,
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
    .put(`/logo/updateStatusById/${_id}`, { isEnabled: status })
    .then((res) => {
      dispatch({
        type: SET_LOGOS,
        payload: res.data
      });
    })
    .catch((err) => {
      alert('ERROR!');
    });
};
