import api from 'utils/api';
import { ADD_FOOTER_CONTENT, REPLACE_FOOTER_CONTENT, SET_FOOTER_CONTENTS, REMOVE_FOOTER_CONTENT } from './types';

export const getAllAct = () => (dispatch) => {
  api
    .get('/footerContent/getAll')
    .then((res) => {
      dispatch({
        type: SET_FOOTER_CONTENTS,
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
    .post('/footerContent/create', data)
    .then((res) => {
      dispatch({
        type: ADD_FOOTER_CONTENT,
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
    .put(`/footerContent/updateById/${_id}`, data)
    .then((res) => {
      dispatch({
        type: REPLACE_FOOTER_CONTENT,
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
    .delete(`/footerContent/deleteById/${_id}`)
    .then((res) => {
      dispatch({
        type: REMOVE_FOOTER_CONTENT,
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
    .put(`/footerContent/updateStatusById/${_id}`, { isEnabled: status })
    .then((res) => {
      dispatch({
        type: SET_FOOTER_CONTENTS,
        payload: res.data
      });
    })
    .catch((err) => {
      alert('ERROR!');
    });
};
