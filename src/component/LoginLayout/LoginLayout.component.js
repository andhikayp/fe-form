import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const LayoutLogin = (props) => {
  const {
    title, content, isLoading, subtitle
  } = props;

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: '100vh', backgroundColor: 'black' }}
    >
      <Container style={{ padding: '10% 0px' }}>
        <Row className="justify-content-md-center">
          <Col xs={12} md={8} className="bg-white p-5 border border-info rounded">
            {!isLoading && content()}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default LayoutLogin;
