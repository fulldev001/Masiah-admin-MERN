import { useEffect, useState } from 'react';

import { Button, Card, Col, Container, Row, Table } from 'react-bootstrap';
import { connect } from 'react-redux';
import PostEditModal from './PostEditModal';
import { getAllPostsAct, deleteOneByIdAct } from 'actions/blogActs';
import { filepath } from '../config';
import { getAllAct } from 'actions/postCategoryActs';

function BlogManagement(props) {
  const { storePosts, getAllPostsAct, deleteOneByIdAct, getAllAct } = props;
  const [modalFlag, setModalFlag] = useState(0);
  const [visiblePostEditModal, setVisiblePostEditModal] = useState(false);
  const [visibleConfirmDeleteModal, setVisibleConfirmDeleteModal] = useState(false);
  const [postId, setPostId] = useState("");

  useEffect(() => {
    getAllAct();
    getAllPostsAct();
  }, []);

  const showPostEditModal = (flag, postId = "") => {
    setModalFlag(flag);
    setVisiblePostEditModal(true);
    setPostId(postId);
  };

  const confirmPostDelete = async (postId) => {
    await deleteOneByIdAct(postId);
    await getAllPostsAct();
  }
  return (
    <>
      <Container fluid>
        <Row>
          <Col md="12">
            <Card className="card-plain table-plain-bg">
              <Card.Header>
                <Card.Title as="h4">Blogs</Card.Title>
                <p className="card-category">
                  You can manage the blogs here.
                  <Button
                    className="btn-fill"
                    variant="primary"
                    style={{ float: 'right' }}
                    onClick={() => showPostEditModal(0)}
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
                      <th className="border-0">Image</th>
                      <th className="border-0">Category</th>
                      <th className="border-0">Author</th>
                      <th className="border-0">Status</th>
                      <th className="border-0">Created At</th>
                      <th className="border-0">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {storePosts.length > 0
                      ? storePosts.map((post, i) => (
                          <tr key={i}>
                            <td>{i + 1}</td>
                            <td>{post.title}</td>
                            <td>
                              {post.image ? <img
                                src={filepath + post.image}
                                height="50px"
                                width="80px"
                              /> : ""}
                            </td>
                            <td>{post.parent.name}</td>
                            <td>{post.author.name}</td>
                            <td></td>
                            <td>{post.createdAt.split('T')[0]}</td>
                            <td>
                              <Button
                                className="btn-fill"
                                variant="info"
                                size="sm"
                                onClick={() => showPostEditModal(1, post._id)}
                              >
                                <i className="nc-icon nc-settings-gear-64" />
                              </Button>
                              &nbsp;
                              <Button
                                className="btn-fill"
                                variant="danger"
                                size="sm"
                                onClick={() => confirmPostDelete(post._id)}
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
        <PostEditModal
          flag={modalFlag}
          visiblePostEditModal={visiblePostEditModal}
          setVisiblePostEditModal={setVisiblePostEditModal}
          postId={postId}
        />
      </Container>
    </>
  );
}

const mapStateToProps = (state) => ({
  storePosts: state.blog.posts,
  storePostCategories: state.postCategory.postCategories
});

export default connect(mapStateToProps, {
  getAllAct,
  getAllPostsAct,
  deleteOneByIdAct
})(BlogManagement);
