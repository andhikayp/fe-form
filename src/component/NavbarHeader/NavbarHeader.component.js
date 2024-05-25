import React, { useState } from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Dropdown from 'react-bootstrap/Dropdown';
import { GoSidebarCollapse } from 'react-icons/go';
import { useHistory } from 'react-router-dom';
import { CgProfile } from 'react-icons/cg';

import { LoadingPage } from '../LoadingPage';
import Paths from '../../root/Paths';
import { logoutUser } from '../../api';

const NavbarHeader = (props) => {
  const history = useHistory();
  const [loading, setLoading] = useState(false);

  const { toggleSidebar } = props;
  const user = JSON.parse(sessionStorage.getItem('user'));
  const accessToken = sessionStorage.getItem('access_token');
  if (!accessToken) {
    history.replace(Paths.Login);
  }

  const handleLogout = async () => {
    await logoutUser(setLoading, history);
  };

  return (
    <Navbar bg="light" expand="lg">
      {loading && <LoadingPage />}
      <div onClick={toggleSidebar} className="d-lg-none me-2 cursor-pointer">
        <GoSidebarCollapse style={{ width: '32px', height: '50px' }} />
      </div>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav" style={{ gap: '25px' }}>
        <Nav className="ms-auto align-items-end">
          <Nav.Link>
            {' '}
            <CgProfile />
            {' '}
            {user?.username}
          </Nav.Link>
          <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
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
  );
};

export default NavbarHeader;
