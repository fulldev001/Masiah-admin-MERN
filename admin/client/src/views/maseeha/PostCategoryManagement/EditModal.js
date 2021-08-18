import { useEffect, useState } from 'react';

import { Button, Col, Form, Modal, Row } from 'react-bootstrap';
import { connect } from 'react-redux';
import { createAct, updateOneByIdAct } from 'actions/postCategoryActs';

function EditModal(props) {
  const {
    flag,
    visibleEditModal,
    setVisibleEditModal,
    postCategoryId,
    storePostCategories,
    createAct,
    updateOneByIdAct
  } = props;
  const [modalTitle, setModalTitle] = useState('');
  const [validated, setValidated] = useState(false);
  const [name, setName] = useState('');
  const [parent, setParent] = useState('');
  const [ancestors, setAncestors] = useState([]);

  useEffect(() => {
    if (flag === 0) {
      setModalTitle('Create a new post category');
      setFormData();
    } else {
      setModalTitle('Update the post category');
      let matchedPostCategory = getOneById(postCategoryId);
      setFormData({
        name: matchedPostCategory.name,
        parent: matchedPostCategory.parent,
        ancestors: matchedPostCategory.ancestors
      });
    }
  }, [flag, postCategoryId]);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);
    let formData = {
      name: name,
      ancestors: ancestors
    };
    if(parent) {
      formData.parent = parent;
    }
    if (flag === 0) {
      createAct(formData);
    } else {
      updateOneByIdAct(postCategoryId, {name: name});
    }
  };

  //  Get the footerContent which is mathced by the prop "postCategoryId" from the storePostCategories
  const getOneById = (postCategoryId) => {
    return storePostCategories.find((footerContent) => footerContent._id === postCategoryId);
  };

  //  Set the states of the form
  const setFormData = (
    data = {
      name: '',
      parent: '',
      ancestors: []
    }
  ) => {
    setName(data.name);
    setParent(data.parent);
    setAncestors(data.ancestors);
  };

  const handleSelectParentCategory = e => {
    // console.log(e.currentTarget.value);
    // console.log(e.currentTarget.ancestors);
    let parentCatgId = e.currentTarget.value
    if(parentCatgId) {
      setParent(parentCatgId);
      let parentCatg = storePostCategories.find(catg => catg._id === parentCatgId);
      setAncestors([...parentCatg.ancestors, parentCatgId]);
    } else {
      setParent('');
      setAncestors([]);
    }
  }
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
            <Form.Label>Category Name</Form.Label>
            <Form.Control
              required
              type="text"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>ParentCategory</Form.Label>
            <Form.Control
              as="select"
              placeholder="Type"
              name="type"
              value={parent}
              disabled={flag === 1 ? true : false}
              onChange={handleSelectParentCategory}
            >
              <option value="">No categories</option>
              {
                storePostCategories.length > 0 ?
                storePostCategories.map((catg, i) => (
                  <option key={i} value={catg._id} ancestors={catg}>{ catg.name }</option>
                )) : ""
              }
            </Form.Control>
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
  storePostCategories: state.postCategory.postCategories
});

export default connect(mapStateToProps, {
  createAct,
  updateOneByIdAct
})(EditModal);
