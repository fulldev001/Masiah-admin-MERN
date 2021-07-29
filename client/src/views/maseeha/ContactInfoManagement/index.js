import { useEffect, useState } from 'react';

import { Button, Card, Col, Container, Row, Table } from 'react-bootstrap';
import { connect } from 'react-redux';
import { filepath } from '../config';
import api from 'utils/api';
import EditModal from './EditModal';

function ContactInfoManagement(props) {
  const [modalFlag, setModalFlag] = useState(0);
  const [visibleEditModal, setVisibleEditModal] = useState(false);
  const [id, setId] = useState('');
  const [contactInfos, setContactInfos] = useState([]);

  useEffect(async () => {
    console.log((await api.get('/contactInfos/getAll')).data);
    await setContactInfos((await api.get('/contactInfos/getAll')).data);
  }, []);
  const showEditModal = (flag, id = '') => {
    setModalFlag(flag);
    setVisibleEditModal(true);
    setId(id);
  };

  const confirmDelete = async (id) => {
    await api.delete(`/contactInfos/deleteOneById/${id}`);
    setContactInfos((await api.get('/contactInfos/getAll')).data);
  };
  return (
    <>
      <Container fluid>
        <Row>
          <Col md="12">
            <Card className="card-plain table-plain-bg">
              <Card.Header>
                <Card.Title as="h4">Contact Info Mangement</Card.Title>
                <p className="card-category">
                  You can manage the Contact Infos here.
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
                      <th className="border-0">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {contactInfos.length > 0
                      ? contactInfos.map((contactInfo, i) => (
                          <tr key={i}>
                            <td>{i + 1}</td>
                            <td>{contactInfo.title}</td>
                            <td>{contactInfo.content}</td>
                            <td>{contactInfo.icon}</td>
                            <td>
                              <Button
                                className="btn-fill"
                                variant="info"
                                size="sm"
                                onClick={() =>
                                  showEditModal(1, contactInfo._id)
                                }
                              >
                                <i className="nc-icon nc-settings-gear-64" />
                              </Button>
                              &nbsp;
                              <Button
                                className="btn-fill"
                                variant="danger"
                                size="sm"
                                onClick={() => confirmDelete(contactInfo._id)}
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
          setContactInfos={setContactInfos}
          contactInfos={contactInfos}
        />
      </Container>
    </>
  );
}

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, {})(ContactInfoManagement);
