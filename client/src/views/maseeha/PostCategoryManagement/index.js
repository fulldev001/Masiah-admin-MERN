import { useEffect, useState } from 'react';

import { Button, Card, Col, Container, Row, Table } from 'react-bootstrap';
import { connect } from 'react-redux';
import Switch from "react-switch"

import EditModal from './EditModal';
import { getAllAct, deleteOneByIdAct } from 'actions/postCategoryActs';

function PostCategoryManagement(props) {
  const { storePostCategories, getAllAct, deleteOneByIdAct } = props;
  const [modalFlag, setModalFlag] = useState(0);
  const [visibleEditModal, setVisibleEditModal] = useState(false);
  const [postCategoryId, setpostCategoryId] = useState("");

  useEffect(() => {
    getAllAct();
  }, []);

  const showEditModal = (flag, postCategoryId = "") => {
    setModalFlag(flag);
    setpostCategoryId(postCategoryId);
    setVisibleEditModal(true);
  };

  const deleteItem = async (postCategoryId) => {
    if(confirm('Are you sure?')) {
      await deleteOneByIdAct(postCategoryId);
      await getAllAct();
    } else {

    }
  }

  return (
    <>
      <Container fluid>
        <Row>
          <Col md="12">
            <Card className="card-plain table-plain-bg">
              <Card.Header>
                <Card.Title as="h4">Post categories</Card.Title>
                <p className="card-category">
                  You can manage the post categories.
                  <Button
                    className="btn-fill"
                    variant="primary"
                    style={{ float: 'right' }}
                    onClick={() => showEditModal(0)}
                  >
                    <i className="nc-icon nc-simple-add" />
                    &nbsp; New
                  </Button>
                </p>
              </Card.Header>
              <Card.Body className="table-full-width table-responsive px-0">
                <Table className="table-hover">
                  <thead>
                    <tr>
                      <th className="border-0">No</th>
                      <th className="border-0">Name</th>
                      <th className="border-0">Parent category</th>
                      <th className="border-0">Created At</th>
                      <th className="border-0">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {storePostCategories.length > 0
                      ? storePostCategories.map((postCategory, i) => (
                          <tr key={i}>
                            <td>{i + 1}</td>
                            <td>{postCategory.name}</td>
                            <td>{postCategory.parent ? postCategory.parent.name : ""}</td>
                            <td>{postCategory.createdAt.split('T')[0]}</td>
                            <td>
                              <Button
                                className="btn-fill"
                                variant="info"
                                size="sm"
                                onClick={() => showEditModal(1, postCategory._id)}
                              >
                                <i className="nc-icon nc-settings-gear-64" />
                              </Button>
                              &nbsp;
                              <Button
                                className="btn-fill"
                                variant="danger"
                                size="sm"
                                onClick={() => deleteItem(postCategory._id)}
                              >
                                <i className="nc-icon nc-simple-remove" />
                              </Button>
                            </td>
                          </tr>
                        ))
                      : ''}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <EditModal
          flag={modalFlag}
          visibleEditModal={visibleEditModal}
          setVisibleEditModal={setVisibleEditModal}
          postCategoryId={postCategoryId}
        />
      </Container>
    </>
  );
}

const mapStateToProps = (state) => ({
  storePostCategories: state.postCategory.postCategories
});

export default connect(mapStateToProps, {
  getAllAct,
  deleteOneByIdAct
})(PostCategoryManagement);
