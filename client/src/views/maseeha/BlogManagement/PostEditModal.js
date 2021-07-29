import { useEffect, useState } from 'react';

import { Button, Col, Form, Modal, Row } from 'react-bootstrap';
import { InputTagsContainer } from 'react-input-tags';
import { connect } from 'react-redux';
import api from 'utils/api';
import { createPostAct, updatePostByIdAct } from "actions/blogActs";

function PostEditModal(props) {
  const {
    flag,
    visiblePostEditModal,
    setVisiblePostEditModal,
    postId,
    storePosts,
    createPostAct,
    updatePostByIdAct
  } = props;
  const [modalTitle, setModalTitle] = useState('');
  const [validated, setValidated] = useState(false);
  const [title, setTitle] = useState('');
  const [image, setImage] = useState(null);
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');
  const [categories, setCategories] = useState([]);
  const [author, setAuthor] = useState('');
  const [users, setUsers] = useState([]);

  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    if (flag === 0) {
      setModalTitle('Create a new post');
      setFormData();
    } else {
      setModalTitle('Update the post');
      let matchedPost = getPostById(postId);
      setFormData({
        title: matchedPost.title,
        image: matchedPost.image,
        summary: matchedPost.summary,
        content: matchedPost.content,
        categories: matchedPost.categories,
        author: matchedPost.author._id
      });
    }
  }, [flag]);

  useEffect(async () => {
    await getAllUsers();
  }, []);

  const getAllUsers = async () => {
    setUsers((await api.get('/users')).data);
  };

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);
    var formData = new FormData();
    formData.append('title', title);
    formData.append('image', image);
    formData.append('categories', categories);
    formData.append('summary', summary);
    formData.append('content', content);
    formData.append('author', author);

    if (flag === 0) {
      createPostAct(formData);
    } else {
      updatePostByIdAct(postId, formData);
    }
  };

  //  Update the state "categories"
  const updateCategories = (catges) => {
    setCategories([...catges]);
  };

  //  Get the post which is mathced by the prop "postId" from the storePosts
  const getPostById = (postId) => {
    console.log(postId);
    return storePosts.find((post) => post._id === postId);
  };

  //  Set the states of the form
  const setFormData = (
    data = {
      title: '',
      image: null,
      summary: '',
      content: '',
      categories: [],
      author: ''
    }
  ) => {
    setTitle(data.title);
    setImage(data.image);
    setSummary(data.summary);
    setContent(data.content);
    setCategories(data.categories);
    setAuthor(data.author);
  };

  return (
    <>
      <Modal
        className="modal modal-primary"
        show={visiblePostEditModal}
        onHide={() => setVisiblePostEditModal(false)}
      >
        <Modal.Header className="justify-content-center">
          <p>{modalTitle}</p>
        </Modal.Header>
        <Modal.Body>
          {/* <Form noValidate validated={validated} onSubmit={handleSubmit}> */}
          <Form.Group>
            <Form.Label>Title*</Form.Label>
            <Form.Control
              required
              type="text"
              name="title"
              placeholder="Input the title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Image</Form.Label>
            <Form.Control
              type="file"
              name="image"
              accept=".png, .jpg, .jpeg"
              onChange={(e) => setImage(e.target.files[0])}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Categories</Form.Label>
            <InputTagsContainer
              tags={categories}
              handleUpdateTags={updateCategories}
              inputMaxWidth={100}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Summary</Form.Label>
            <Form.Control
              as="textarea"
              name="summary"
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Content</Form.Label>
            <Form.Control
              as="textarea"
              rows={10}
              name="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Control
              as="select"
              placeholder="Input"
              name="type"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
            >
              <option value="" hidden>
                Choose an author.
              </option>
              {users.length > 0
                ? users.map((user, i) => (
                    <option value={user._id}>{user.name}</option>
                  ))
                : ''}
            </Form.Control>
          </Form.Group>
          <Button type="submit" onClick={handleSubmit}>
            Save
          </Button>
          {/* </Form> */}
        </Modal.Body>
      </Modal>
    </>
  );
}

const mapStateToProps = (state) => ({
  storePosts: state.blog.posts
});

export default connect(mapStateToProps, {
  createPostAct,
  updatePostByIdAct
})(PostEditModal);
