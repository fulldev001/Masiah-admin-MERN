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
    members,
    setMembers
  } = props;
  const [modalTitle, setModalTitle] = useState('');
  const [validated, setValidated] = useState(false);
  const [name, setName] = useState('');
  const [avatar, setAvatar] = useState(null);
  const [position, setPosition] = useState('');
  const [description, setDescription] = useState('');
  const [linkedinUrl, setLinkedinUrl] = useState('');
  const [twitterUrl, setTwitterUrl] = useState([]);
  const [users, setUsers] = useState([]);

  const [avatarFile, setAvatarFile] = useState(null);

  useEffect(() => {
    if (flag === 0) {
      setModalTitle('Create a new member');
      setFormData();
    } else {
      setModalTitle('Update the member');
      let matchedItem = getOneById(id);
      setFormData({
        name: matchedItem.name,
        avatar: matchedItem.avatar,
        position: matchedItem.position,
        description: matchedItem.description,
        linkedinUrl: matchedItem.linkedinUrl,
        twitterUrl: matchedItem.twitterUrl
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
    formData.append('name', name);
    formData.append('avatar', avatar);
    formData.append('position', position);
    formData.append('description', description);
    formData.append('linkedinUrl', linkedinUrl);
    formData.append('twitterUrl', twitterUrl);

    if (flag === 0) {
      await api.post("/teamMembers/create", formData);
    } else {
      await api.put(`/teamMembers/updateOneById/${id}`, formData);
    }
    await setMembers((await api.get("/teamMembers/getAll")).data);
  };

  //  Get the post which is mathced by the prop "id" from the members
  const getOneById = (id) => {
    return members.find((post) => post._id === id);
  };

  //  Set the states of the form
  const setFormData = (
    data = {
      name: '',
      avatar: null,
      position: '',
      description: '',
      linkedinUrl: '',
      twitterUrl: ''
    }
  ) => {
    setName(data.name);
    setAvatar(data.avatar);
    setPosition(data.position);
    setDescription(data.description);
    setLinkedinUrl(data.linkedinUrl);
    setTwitterUrl(data.twitterUrl);
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
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Avatar</Form.Label>
            <Form.Control
              type="file"
              name="avatar"
              accept=".png, .jpg, .jpeg"
              onChange={(e) => setAvatar(e.target.files[0])}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Position</Form.Label>
            <Form.Control
              type="text"
              name="position"
              value={position}
              onChange={(e) => setPosition(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              type="text"
              name="position"
              rows={5}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Linkedin</Form.Label>
            <Form.Control
              type="text"
              name="linkedinUrl"
              value={linkedinUrl}
              onChange={(e) => setLinkedinUrl(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Twitter</Form.Label>
            <Form.Control
              type="text"
              name="twitterUrl"
              value={twitterUrl}
              onChange={(e) => setTwitterUrl(e.target.value)}
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
