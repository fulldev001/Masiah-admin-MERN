import { useEffect, useState } from 'react';

import { Button, Col, Form, Modal, Row } from 'react-bootstrap';
import { InputTagsContainer } from 'react-input-tags';
import { connect } from 'react-redux';
import api from 'utils/api';

function EditModal(props) {
  const {
    flag,
    visibleEditModal,
    setVisibleEditModal,
    id,
    healthyLifes,
    setHealthyLifes
  } = props;
  const [modalTitle, setModalTitle] = useState('');
  const [validated, setValidated] = useState(false);
  const [title, setTitle] = useState('');
  const [image, setImage] = useState(null);
  const [content, setContent] = useState('');

  useEffect(() => {
    if (flag === 0) {
      setModalTitle('Create a new member');
      setFormData();
    } else {
      setModalTitle('Update the member');
      let matchedItem = getOneById(id);
      setFormData({
        title: matchedItem.title,
        image: matchedItem.image,
        content: matchedItem.content
      });
    }
  }, [flag]);

  const handleSubmit = async (event) => {
    const form = event.currentTarget;
    if (await form.checkValidity() === false) {
      await event.preventDefault();
      await event.stopPropagation();
    }
    await setValidated(true);
    var formData = new FormData();
    formData.append('title', title);
    formData.append('image', image);
    formData.append('content', content);

    if (flag === 0) {
      await api.post("/healthyLifes/create", formData);
    } else {
      await api.put(`/healthyLifes/updateOneById/${id}`, formData);
    }
    await setHealthyLifes((await api.get("/healthyLifes/getAll")).data);
  };

  //  Get the post which is mathced by the prop "id" from the healthyLifes
  const getOneById = (id) => {
    return healthyLifes.find((post) => post._id === id);
  };

  //  Set the states of the form
  const setFormData = (
    data = {
      title: "",
      image: null,
      content: ""
    }
  ) => {
    setTitle(data.title);
    setImage(data.image);
    setContent(data.content);
  };

  return (
    <>
      <Modal
        className="modal modal-primary"
        show={visibleEditModal}
        onHide={() => setVisibleEditModal(false)}
      >
        <Modal.Header className="justify-content-center">
          <p>{modalTitle}</p>
        </Modal.Header>
        <Modal.Body>
          {/* <Form noValidate validated={validated} onSubmit={handleSubmit}> */}
          <Form.Group>
            <Form.Label>Name*</Form.Label>
            <Form.Control
              required
              type="text"
              name="name"
              placeholder="Input the name"
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
            <Form.Label>Content</Form.Label>
            <Form.Control
              type="text"
              name="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
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
});

export default connect(mapStateToProps, {
})(EditModal);
