import api from 'utils/api';
import { ADD_NEW_POST, REPLACE_ONE_POST, SET_POSTS, REMOVE_ONE_POST } from './types';

export const getAllPostsAct = () => (dispatch) => {
  api
    .get('/posts/getAll')
    .then((res) => {
      dispatch({
        type: SET_POSTS,
        payload: res.data
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const createPostAct = (data) => (dispatch) => {
  api
    .post('/posts/create', data)
    .then((res) => {
      dispatch({
        type: ADD_NEW_POST,
        payload: res.data
      });
      alert('Success!');
    })
    .catch((err) => {
      alert('ERROR!');
    });
};

export const updatePostByIdAct = (postId, data) => (dispatch) => {
  api
    .put(`/posts/updateById/${postId}`, data)
    .then((res) => {
      dispatch({
        type: REPLACE_ONE_POST,
        payload: res.data
      });
      alert('Success!');
    })
    .catch((err) => {
      alert('ERROR!');
    });
};

export const deleteOneByIdAct = postId => dispatch => {
  console.log(postId);
  api.delete(`/posts/deleteOneById/${postId}`)
    .then(res => {
      dispatch({
        type: REMOVE_ONE_POST,
        payload: postId
      })
      alert("Delete Success!")
    })
    .catch((err) => {
      alert('ERROR!');
    });
}