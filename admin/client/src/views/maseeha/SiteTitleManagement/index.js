import { useEffect, useState } from 'react';

import { Button, Card, Col, Container, Row, Table } from 'react-bootstrap';
import { connect } from 'react-redux';
import Switch from "react-switch"

import EditModal from './EditModal';
import { getAllAct, deleteOneByIdAct, updateStatusByIdAct } from 'actions/siteTitleActs';
import { filepath } from '../config';

function SiteTitleManagement(props) {
  const { storeSiteTitles, getAllAct, deleteOneByIdAct, updateStatusByIdAct } = props;
  const [modalFlag, setModalFlag] = useState(0);
  const [visibleEditModal, setVisibleEditModal] = useState(false);
  const [siteTitleId, setSiteTitleId] = useState("");

  useEffect(() => {
    getAllAct();
  }, []);

  const showEditModal = (flag, siteTitleId = "") => {
    setModalFlag(flag);
    setSiteTitleId(siteTitleId);
    setVisibleEditModal(true);
  };

  const deleteItem = async (siteTitleId) => {
    if(confirm('Are you sure?')) {
      await deleteOneByIdAct(siteTitleId);
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
                <Card.Title as="h4">Titles of this Site</Card.Title>
                <p className="card-category">
                  You can manage the titles of this site.
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
                      <th className="border-0">Favicon</th>
                      <th className="border-0">Status</th>
                      <th className="border-0">Created At</th>
                      <th className="border-0">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {storeSiteTitles.length > 0
                      ? storeSiteTitles.map((siteTitle, i) => (
                          <tr key={i}>
                            <td>{i + 1}</td>
                            <td>{siteTitle.title}</td>
                            <td>
                              <img
                                src={filepath + siteTitle.favicon}
                                height="50px"
                                width="50px"
                              />
                            </td> 
                            <td><Switch onChange={status => handleStatus(status, siteTitle._id)} checked={siteTitle.isEnabled} /></td>
                            <td>{siteTitle.createdAt.split('T')[0]}</td>
                            <td>
                              <Button
                                className="btn-fill"
                                variant="info"
                                size="sm"
                                onClick={() => showEditModal(1, siteTitle._id)}
                              >
                                <i className="nc-icon nc-settings-gear-64" />
                              </Button>
                              &nbsp;
                              <Button
                                className="btn-fill"
                                variant="danger"
                                size="sm"
                                onClick={() => deleteItem(siteTitle._id)}
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
          siteTitleId={siteTitleId}
        />
      </Container>
    </>
  );
}

const mapStateToProps = (state) => ({
  storeSiteTitles: state.siteTitle.siteTitles
});

export default connect(mapStateToProps, {
  getAllAct,
  deleteOneByIdAct,
  updateStatusByIdAct
})(SiteTitleManagement);
