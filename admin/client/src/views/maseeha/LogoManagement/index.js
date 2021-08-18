import { useEffect, useState } from 'react';

import { Button, Card, Col, Container, Row, Table } from 'react-bootstrap';
import { connect } from 'react-redux';
import Switch from "react-switch"

import EditModal from './EditModal';
import { getAllAct, deleteOneByIdAct, updateStatusByIdAct } from 'actions/logoActs';
import { filepath } from '../config';

function LogoManagement(props) {
  const { storeLogos, getAllAct, deleteOneByIdAct, updateStatusByIdAct } = props;
  const [modalFlag, setModalFlag] = useState(0);
  const [visibleEditModal, setVisibleEditModal] = useState(false);
  const [logoId, setLogoId] = useState("");

  useEffect(() => {
    getAllAct();
  }, []);

  const showEditModal = (flag, logoId = "") => {
    setModalFlag(flag);
    setLogoId(logoId);
    setVisibleEditModal(true);
  };

  const deleteItem = async (logoId) => {
    if(confirm('Are you sure?')) {
      await deleteOneByIdAct(logoId);
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
                <Card.Title as="h4">Logos</Card.Title>
                <p className="card-category">
                  You can manage the logos.
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
                      <th className="border-0">Type</th>
                      <th className="border-0">Content</th>
                      <th className="border-0">Status</th>
                      <th className="border-0">Created At</th>
                      <th className="border-0">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {storeLogos.length > 0
                      ? storeLogos.map((logo, i) => (
                          <tr key={i}>
                            <td>{i + 1}</td>
                            <td>{logo.type}</td>
                            {
                              logo.type === "image" ?
                              <td>
                                <img
                                  src={filepath + logo.content}
                                  height="50px"
                                  width="50px"
                                />
                              </td> : 
                              <td>{logo.content}</td>
                            }
                            <td><Switch onChange={status => handleStatus(status, logo._id)} checked={logo.isEnabled} /></td>
                            <td>{logo.createdAt.split('T')[0]}</td>
                            <td>
                              <Button
                                className="btn-fill"
                                variant="info"
                                size="sm"
                                onClick={() => showEditModal(1, logo._id)}
                              >
                                <i className="nc-icon nc-settings-gear-64" />
                              </Button>
                              &nbsp;
                              <Button
                                className="btn-fill"
                                variant="danger"
                                size="sm"
                                onClick={() => deleteItem(logo._id)}
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
          logoId={logoId}
        />
      </Container>
    </>
  );
}

const mapStateToProps = (state) => ({
  storeLogos: state.logo.logos
});

export default connect(mapStateToProps, {
  getAllAct,
  deleteOneByIdAct,
  updateStatusByIdAct
})(LogoManagement);
