import { useEffect, useState } from 'react';

import { Button, Card, Col, Container, Row, Table } from 'react-bootstrap';
import { connect } from 'react-redux';
import { filepath } from '../config';
import api from 'utils/api';
import EditModal from "./EditModal";

function OurTeamManagement(props) {
  const [modalFlag, setModalFlag] = useState(0);
  const [visibleEditModal, setVisibleEditModal] = useState(false);
  const [id, setId] = useState("");
  const [members, setMembers] = useState([]);

  useEffect(async () => {
    console.log((await api.get("/teamMembers/getAll")).data);
    await setMembers((await api.get("/teamMembers/getAll")).data);
  }, []);
  const showEditModal = (flag, id = "") => {
    setModalFlag(flag);
    setVisibleEditModal(true);
    setId(id);
  };

  const confirmDelete = async (id) => {
    await api.delete(`/teamMembers/deleteOneById/${id}`);
    setMembers((await api.get("/teamMembers/getAll")).data);
  }
  return (
    <>
      <Container fluid>
        <Row>
          <Col md="12">
            <Card className="card-plain table-plain-bg">
              <Card.Header>
                <Card.Title as="h4">Team Members</Card.Title>
                <p className="card-category">
                  You can manage the Team Members here.
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
                      <th className="border-0">Avatar</th>
                      <th className="border-0">Position</th>
                      <th className="border-0">Linkedin Url</th>
                      <th className="border-0">Twitter Url</th>
                      <th className="border-0">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {members.length > 0
                      ? members.map((member, i) => (
                          <tr key={i}>
                            <td>{i + 1}</td>
                            <td>{member.name}</td>
                            <td>
                              <img
                                src={filepath + member.avatar}
                                height="80px"
                                width="80px"
                              />
                            </td>
                            <td>{member.position}</td>
                            <td>{member.linkedinUrl}</td>
                            <td>{member.twitterUrl}</td>
                            <td>
                              <Button
                                className="btn-fill"
                                variant="info"
                                size="sm"
                                onClick={() => showEditModal(1, member._id)}
                              >
                                <i className="nc-icon nc-settings-gear-64" />
                              </Button>
                              &nbsp;
                              <Button
                                className="btn-fill"
                                variant="danger"
                                size="sm"
                                onClick={() => confirmDelete(member._id)}
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
          setMembers={setMembers}
          members={members}
        />
      </Container>
    </>
  );
}

const mapStateToProps = (state) => ({
});

export default connect(mapStateToProps, {
})(OurTeamManagement);
