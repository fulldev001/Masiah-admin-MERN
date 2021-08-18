import { useEffect, useState } from 'react';

import { Button, Col, Form, Modal, Row } from 'react-bootstrap';
import { InputTagsContainer } from 'react-input-tags';
import { connect } from 'react-redux';
import api from 'utils/api';
import { createAct, updateOneByIdAct } from 'actions/siteTitleActs';

function EditModal(props) {
  const {
    flag,
    visibleEditModal,
    setVisibleEditModal,
    siteTitleId,
    storeSiteTitles,
    createAct,
    updateOneByIdAct
  } = props;
  const [modalTitle, setModalTitle] = useState('');
  const [validated, setValidated] = useState(false);
  const [title, setTitle] = useState('');
  const [favicon, setFavicon] = useState(null);

  useEffect(() => {
    if (flag === 0) {
      setModalTitle('Create a new site title');
      setFormData();
    } else {
      setModalTitle('Update the site title');
      let matchedSiteTitle = getOneById(siteTitleId);
      setFormData({
        title: matchedSiteTitle.title,
        favicon: matchedSiteTitle.favicon
      });
    }
  }, [flag, siteTitleId]);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);
    var formData = new FormData();
    formData.append('title', title);
    formData.append('favicon', favicon);
    if (flag === 0) {
      createAct(formData);
    } else {
      updateOneByIdAct(siteTitleId, formData);
    }
  };

  //  Get the siteTitle which is mathced by the prop "siteTitleId" from the storeSiteTitles
  const getOneById = (siteTitleId) => {
    return storeSiteTitles.find((siteTitle) => siteTitle._id === siteTitleId);
  };

  //  Set the states of the form
  const setFormData = (
    data = {
      title: '',
      favicon: null
    }
  ) => {
    setTitle(data.title);
    setFavicon(data.favicon);
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
              placeholder="Input the siteTitle Text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Favicon Image</Form.Label>
            <Form.Control
              type="file"
              name="image"
              accept=".png, .jpg, .jpeg"
              onChange={(e) => setFavicon(e.target.files[0])}
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
  storeSiteTitles: state.siteTitle.siteTitles
});

export default connect(mapStateToProps, {
  createAct,
  updateOneByIdAct
})(EditModal);
