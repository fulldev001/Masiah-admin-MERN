import { useEffect, useState } from 'react';

import { Button, Col, Form, Modal, Row } from 'react-bootstrap';
import { InputTagsContainer } from 'react-input-tags';
import { connect } from 'react-redux';
import api from 'utils/api';
import { createAct, updateOneByIdAct } from 'actions/footerContentActs';

function EditModal(props) {
  const {
    flag,
    visibleEditModal,
    setVisibleEditModal,
    footerContentId,
    storeFooterContents,
    createAct,
    updateOneByIdAct
  } = props;
  const [modalTitle, setModalTitle] = useState('');
  const [validated, setValidated] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [copyright, setCopyright] = useState('');

  useEffect(() => {
    if (flag === 0) {
      setModalTitle('Create a new site title');
      setFormData();
    } else {
      setModalTitle('Update the site title');
      let matchedFooterContent = getOneById(footerContentId);
      setFormData({
        title: matchedFooterContent.title,
        content: matchedFooterContent.content,
        copyright: matchedFooterContent.copyright
      });
    }
  }, [flag, footerContentId]);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);
    let formData = {
      title: title,
      content: content,
      copyright: copyright
    }
    if (flag === 0) {
      createAct(formData);
    } else {
      updateOneByIdAct(footerContentId, formData);
    }
  };

  //  Get the footerContent which is mathced by the prop "footerContentId" from the storeFooterContents
  const getOneById = (footerContentId) => {
    return storeFooterContents.find((footerContent) => footerContent._id === footerContentId);
  };

  //  Set the states of the form
  const setFormData = (
    data = {
      title: '',
      content: '',
      copyright: ''
    }
  ) => {
    setTitle(data.title);
    setContent(data.content);
    setCopyright(data.copyright);
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
          <Form.Group>
            <Form.Label>Title</Form.Label>
            <Form.Control
              required
              type="text"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Content</Form.Label>
            <Form.Control
              required
              as="textarea"
              name="content"
              rows={5}
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Copyright</Form.Label>
            <Form.Control
              required
              type="text"
              name="copyright"
              value={copyright}
              onChange={(e) => setCopyright(e.target.value)}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button type="submit" onClick={handleSubmit}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

const mapStateToProps = (state) => ({
  storeFooterContents: state.footerContent.footerContents
});

export default connect(mapStateToProps, {
  createAct,
  updateOneByIdAct
})(EditModal);
