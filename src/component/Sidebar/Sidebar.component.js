import React from 'react';
import Nav from 'react-bootstrap/Nav';
import Col from 'react-bootstrap/Col';
import { Link, useLocation } from 'react-router-dom';

import Logo from '../../resource/images/logo.png';
import './Sidebar.css';
import config from './Sidebar.config';

const { menus } = config;

const Sidebar = () => {
  const location = useLocation();
  const user = JSON.parse(sessionStorage.getItem('user'));
  const { role } = user;

  const renderMenu = (menu) => (
    menu.role.includes(role) && (
    <Nav.Link as={Link} to={menu.path} className={location.pathname === menu.path ? 'active bg-orange text-white' : 'text-white'}>
      <div className="custom">
        {menu.icon}
        <div>
          {menu.name}
        </div>
      </div>
    </Nav.Link>
    )
  );

  return (
    <Col
      className="bg-dark text-white no-margin"
    >
      <div style={{ width: '100%', backgroundColor: 'white' }} className="d-flex justify-content-center mb-5">
        <img src={Logo} alt={Logo} width={150} />
      </div>
      <Nav className="flex-column">
        {menus.map(renderMenu)}
      </Nav>
    </Col>
  );
};

export default Sidebar;
