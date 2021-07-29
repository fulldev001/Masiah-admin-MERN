import { useEffect, useState } from 'react';

import { Button, Card, Col, Container, Row, Table } from 'react-bootstrap';
import { connect } from 'react-redux';
import { filepath } from '../config';
import api from 'utils/api';
import EditModal from "./EditModal";

function HealthyLifeManagement(props) {
  const [modalFlag, setModalFlag] = useState(0);
  const [visibleEditModal, setVisibleEditModal] = useState(false);
  const [id, setId] = useState("");
  const [healthyLifes, setHealthyLifes] = useState([]);

  useEffect(async () => {
    console.log((await api.get("/healthyLifes/getAll")).data);
    await setHealthyLifes((await api.get("/healthyLifes/getAll")).data);
  }, []);
  const showEditModal = (flag, id = "") => {
    setModalFlag(flag);
    setVisibleEditModal(true);
    setId(id);
  };

  const confirmDelete = async (id) => {
    await api.delete(`/healthyLifes/deleteOneById/${id}`);
    setHealthyLifes((await api.get("/healthyLifes/getAll")).data);
  }
  return (
    <>
      <Container fluid>
        <Row>
          <Col md="12">
            <Card className="card-plain table-plain-bg">
              <Card.Header>
                <Card.Title as="h4">Team Healthy Lifes</Card.Title>
                <p className="card-category">
                  You can manage the Team Healthy Lifes here.
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
                      <th className="border-0">Image</th>
                      <th className="border-0">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {healthyLifes.length > 0
                      ? healthyLifes.map((healthyLife, i) => (
                          <tr key={i}>
                            <td>{i + 1}</td>
                            <td>{healthyLife.title}</td>
                            <td>{healthyLife.content}</td>
                            <td>
                              <img
                                src={filepath + healthyLife.image}
                                height="80px"
                                width="80px"
                              />
                            </td>
                            <td>
                              <Button
                                className="btn-fill"
                                variant="info"
                                size="sm"
                                onClick={() => showEditModal(1, healthyLife._id)}
                              >
                                <i className="nc-icon nc-settings-gear-64" />
                              </Button>
                              &nbsp;
                              <Button
                                className="btn-fill"
                                variant="danger"
                                size="sm"
                                onClick={() => confirmDelete(healthyLife._id)}
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
          id={id}
          setHealthyLifes={setHealthyLifes}
          healthyLifes={healthyLifes}
        />
      </Container>
    </>
  );
}

const mapStateToProps = (state) => ({
});

export default connect(mapStateToProps, {
})(HealthyLifeManagement);
