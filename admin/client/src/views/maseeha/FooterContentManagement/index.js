import { useEffect, useState } from 'react';

import { Button, Card, Col, Container, Row, Table } from 'react-bootstrap';
import { connect } from 'react-redux';
import Switch from "react-switch"

import EditModal from './EditModal';
import { getAllAct, deleteOneByIdAct, updateStatusByIdAct } from 'actions/footerContentActs';

function FooterContentManagement(props) {
  const { storeFooterContents, getAllAct, deleteOneByIdAct, updateStatusByIdAct } = props;
  const [modalFlag, setModalFlag] = useState(0);
  const [visibleEditModal, setVisibleEditModal] = useState(false);
  const [footerContentId, setfooterContentId] = useState("");

  useEffect(() => {
    getAllAct();
  }, []);

  const showEditModal = (flag, footerContentId = "") => {
    setModalFlag(flag);
    setfooterContentId(footerContentId);
    setVisibleEditModal(true);
  };

  const deleteItem = async (footerContentId) => {
    if(confirm('Are you sure?')) {
      await deleteOneByIdAct(footerContentId);
      await getAllAct();
    } else {

    }
  }

  const handleStatus = (status, _id) => {
    console.log(status, _id);
    updateStatusByIdAct(_id, status);
  }
  return (
    <>
      <Container fluid>
        <Row>
          <Col md="12">
            <Card className="card-plain table-plain-bg">
              <Card.Header>
                <Card.Title as="h4">footerContents</Card.Title>
                <p className="card-category">
                  You can manage the footerContents.
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
                      <th className="border-0">Title</th>
                      <th className="border-0">Content</th>
                      <th className="border-0">Copyright</th>
                      <th className="border-0">Status</th>
                      <th className="border-0">Created At</th>
                      <th className="border-0">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {storeFooterContents.length > 0
                      ? storeFooterContents.map((footerContent, i) => (
                          <tr key={i}>
                            <td>{i + 1}</td>
                            <td>{footerContent.title}</td>
                            <td>{footerContent.content}</td>
                            <td>{footerContent.copyright}</td>
                            <td><Switch onChange={status => handleStatus(status, footerContent._id)} checked={footerContent.isEnabled} /></td>
                            <td>{footerContent.createdAt.split('T')[0]}</td>
                            <td>
                              <Button
                                className="btn-fill"
                                variant="info"
                                size="sm"
                                onClick={() => showEditModal(1, footerContent._id)}
                              >
                                <i className="nc-icon nc-settings-gear-64" />
                              </Button>
                              &nbsp;
                              <Button
                                className="btn-fill"
                                variant="danger"
                                size="sm"
                                onClick={() => deleteItem(footerContent._id)}
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
          footerContentId={footerContentId}
        />
      </Container>
    </>
  );
}

const mapStateToProps = (state) => ({
  storeFooterContents: state.footerContent.footerContents
});

export default connect(mapStateToProps, {
  getAllAct,
  deleteOneByIdAct,
  updateStatusByIdAct
})(FooterContentManagement);
