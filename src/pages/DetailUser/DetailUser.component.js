import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Paths from '../../root/Paths';
import { Layout } from '../../component/Layout';

const DetailUser = (props) => {
  const { history } = props;
  const [isLoading, setIsLoading] = useState(true);
  const data = history?.location?.state?.response?.data;

  useEffect(() => {
    if (!data) {
      history.replace(Paths.Home);
    }
    if (data) {
      setIsLoading(false);
    }
  }, [data]);

  const renderField = ({ key, value, type }) => (
    <div className="mb-3">
      <Row>
        <Col xs={3} md={4}>{key}</Col>
        {type !== 'password'
          ? (<Col xs={6} md={8}>{`: ${value}`}</Col>)
          : (<Col xs={6} md={8}>:</Col>)}
      </Row>
      {type === 'password'
      && (
      <Row className="mt-2">
        <Col>
          <Form.Control as="textarea" readOnly value={value} />
        </Col>
      </Row>
      )}
    </div>
  );

  const renderContent = () => {
    const {
      username, name, email, phoneNumber, password, confirmPassword
    } = data;

    const content = [{
      key: 'Username',
      value: username
    }, {
      key: 'Name',
      value: name
    }, {
      key: 'Email',
      value: email,
    }, {
      key: 'Phone Number',
      value: phoneNumber
    }, {
      key: 'Hash Password',
      value: password,
      type: 'password'
    }, {
      key: 'Hash Confirm Password',
      value: confirmPassword,
      type: 'password'
    }];

    return (
      <div>
        {content.map(renderField)}
      </div>
    );
  };

  return (
    <Layout
      title="Detail User"
      content={renderContent}
      isLoading={isLoading}
    />
  );
};

export default DetailUser;
