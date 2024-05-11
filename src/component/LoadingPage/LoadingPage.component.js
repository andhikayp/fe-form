import React from 'react';
import { Spinner } from 'react-bootstrap';

import './LoadingPage.css';

const LoadingPage = () => (
  <div className="full-page-loading">
    <Spinner animation="border" role="status">
      <span className="visually-hidden">Loading...</span>
    </Spinner>
  </div>
);

export default LoadingPage;
