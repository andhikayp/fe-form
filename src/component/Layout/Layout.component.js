import React, { useState } from 'react';
import {
  Container, Row, Col, Offcanvas
} from 'react-bootstrap';

import './Layout.css';
import { Sidebar } from '../Sidebar';
import { NavbarHeader } from '../NavbarHeader';

const Layout = (props) => {
  const { content } = props;
  const [showSidebar, setShowSidebar] = useState(false);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const renderSidebar = () => (
    <Sidebar />
  );

  const renderNavbarHeader = () => (
    <NavbarHeader
      toggleSidebar={toggleSidebar}
    />
  );
  return (
    <Container fluid className="d-flex flex-column min-vh-100">
      <Row className="flex-grow-1">
        <Offcanvas show={showSidebar} onHide={toggleSidebar} className="bg-dark" style={{ width: '100vw' }}>
          <Offcanvas.Header closeButton closeVariant="white" />
          <Offcanvas.Body
            className="no-outline"
          >
            {renderSidebar()}
          </Offcanvas.Body>
        </Offcanvas>

        <Col lg={3} className="d-none d-lg-flex flex-column bg-dark no-outline pt-5">
          {renderSidebar()}
        </Col>

        <Col
          lg={9}
          className="d-flex flex-column px-3"
          style={{ backgroundColor: '#F5F5F5' }}
        >
          {renderNavbarHeader()}

          <div className="flex-grow-1 mt-5">
            <div className="content">
              {content()}
            </div>
          </div>

          <footer className="bg-white text-center p-3 my-3 mt-auto rounded">
            PT Bank Neo Commerce Tbk is licensed and supervised by the Indonesia Financial Service
            {' '}
            Authority (OJK) and insured member of Deposit Insurance Corporation (LPS).
          </footer>
        </Col>
      </Row>
    </Container>
  );
};

export default Layout;
