import React, { useState } from 'react';
import {
  Navbar, Nav, Container, Row, Col, Offcanvas
} from 'react-bootstrap';
import Dropdown from 'react-bootstrap/Dropdown';
import { GoSidebarCollapse } from 'react-icons/go';

import './Layout.css';
import { Sidebar } from '../Sidebar';

const Layout = (props) => {
  const { content } = props;
  const [showSidebar, setShowSidebar] = useState(false);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const renderSidebar = () => (
    <Sidebar />
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

        <Col lg={9} className="d-flex flex-column px-3 bg-light">
          <Navbar bg="light" expand="lg">
            <div onClick={toggleSidebar} className="d-lg-none me-2 cursor-pointer">
              <GoSidebarCollapse style={{ width: '32px', height: '50px' }} />
            </div>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="ms-auto align-items-end">
                <Nav.Link href="#logout">Logout</Nav.Link>
                <Nav.Link href="#logout">Username</Nav.Link>
              </Nav>
              <Nav.Item
                className="d-flex justify-content-end align-items-center"
              >
                <Dropdown>
                  <Dropdown.Toggle variant="outline-secondary" id="dropdown-basic" className="btn-sm">
                    Language
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item href="#/action-1">English</Dropdown.Item>
                    <Dropdown.Item href="#/action-2">Bahasa</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </Nav.Item>
            </Navbar.Collapse>
          </Navbar>

          <div className="flex-grow-1 p-3">
            <div className="content">
              {content}
            </div>
          </div>

          <footer className="bg-white text-center p-3 my-3 mt-auto">
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
