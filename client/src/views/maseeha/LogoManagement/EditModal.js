import { useEffect, useState } from 'react';

import { Button, Col, Form, Modal, Row } from 'react-bootstrap';
import { InputTagsContainer } from 'react-input-tags';
import { connect } from 'react-redux';
import api from 'utils/api';
import { createAct, updateOneByIdAct } from 'actions/logoActs';

function EditModal(props) {
  const {
    flag,
    visibleEditModal,
    setVisibleEditModal,
    logoId,
    storeLogos,
    createAct,
    updateOneByIdAct
  } = props;
  const [modalTitle, setModalTitle] = useState('');
  const [validated, setValidated] = useState(false);
  const [type, setType] = useState('text');
  const [image, setImage] = useState(null);
  const [text, setText] = useState('');

  useEffect(() => {
    console.log(flag);
    if (flag === 0) {
      setModalTitle('Create a new logo');
      setFormData();
    } else {
      setModalTitle('Update the logo');
      let matchedLogo = getOneById(logoId);
      if(matchedLogo.type === "text") {
        setFormData({
          type: 'text',
          text: matchedLogo.content,
          image: null
        });
      } else {
        setFormData({
          type: 'image',
          image: matchedLogo.content,
          text: ''
        });
      }
    }
  }, [flag, logoId]);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);
    var formData = new FormData();
    formData.append('type', type);
    if(type === "text") {
      formData.append('content', text);
    } else {
      formData.append('content', image);
    }
    
    if (flag === 0) {
      createAct(formData);
    } else {
      updateOneByIdAct(logoId, formData);
    }
  };

  //  Get the logo which is mathced by the prop "logoId" from the storeLogos
  const getOneById = (logoId) => {
    return storeLogos.find((logo) => logo._id === logoId);
  };

  //  Set the states of the form
  const setFormData = (
    data = {
      type: 'text',
      image: null,
      text: ''
    }
  ) => {
    setType(data.type);
    setImage(data.image);
    setText(data.text);
  };

  return (
    <>
      <Modal
        className="modal modal-primary"
        show={visibleEditModal}
        onHide={() => setVisibleEditModal(false)}
      >
        <Modal.Header className="justify-text-center">
          <p>{modalTitle}</p>
        </Modal.Header>
        <Modal.Body>
          {/* <Form noValidate validated={validated} onSubmit={handleSubmit}> */}
          <Form.Group>
            <Form.Label>Type*</Form.Label>
            <Form.Control
              as="select"
              placeholder="Type"
              name="type"
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <option value="text">Text</option>
              <option value="image">Image</option>
            </Form.Control>
          </Form.Group>
          {type === 'image' ? (
            <Form.Group>
              <Form.Label>Logo Image</Form.Label>
              <Form.Control
                type="file"
                name="image"
                accept=".png, .jpg, .jpeg"
                onChange={(e) => setImage(e.target.files[0])}
              />
            </Form.Group>
          ) : (
            <Form.Group>
              <Form.Label>Logo Text</Form.Label>
              <Form.Control
                required
                type="text"
                name="text"
                placeholder="Input the Logo Text"
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
            </Form.Group>
          )}
          <Button type="submit" onClick={handleSubmit}>
            Save
          </Button>
        </Modal.Body>
      </Modal>
    </>
  );
}

const mapStateToProps = (state) => ({
  storeLogos: state.logo.logos
});

export default connect(mapStateToProps, {
  createAct,
  updateOneByIdAct
})(EditModal);
