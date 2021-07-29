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
    services,
    setServices
  } = props;
  const [modalTitle, setModalTitle] = useState('');
  const [validated, setValidated] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [icon, setIcon] = useState('');

  useEffect(() => {
    if (flag === 0) {
      setModalTitle('Create a new Service');
      setFormData();
    } else {
      setModalTitle('Update the service');
      let matchedItem = getOneById(id);
      setFormData({
        title: matchedItem.title,
        content: matchedItem.content,
        icon: matchedItem.icon
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
    var formData = {
      title: title,
      content: content,
      icon: icon
    };

    if (flag === 0) {
      await api.post("/services/create", formData);
    } else {
      await api.put(`/services/updateOneById/${id}`, formData);
    }
    await setServices((await api.get("/services/getAll")).data);
  };

  //  Get the post which is mathced by the prop "id" from the services
  const getOneById = (id) => {
    return services.find((post) => post._id === id);
  };

  //  Set the states of the form
  const setFormData = (
    data = {
      title: '',
      content: '',
      icon: ''
    }
  ) => {
    setTitle(data.title);
    setContent(data.content);
    setIcon(data.icon);
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
            <Form.Label>Content</Form.Label>
            <Form.Control
              type="text"
              name="position"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Icon name</Form.Label>
            <Form.Control
              type="text"
              name="twitterUrl"
              value={icon}
              onChange={(e) => setIcon(e.target.value)}
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
