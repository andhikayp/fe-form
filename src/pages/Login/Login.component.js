import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { FormGroup } from '../../component/FormGroup';
import { LoginLayout } from '../../component/LoginLayout';
import { LoadingPage } from '../../component/LoadingPage';
import Paths from '../../root/Paths';
import { loginUser } from '../../api';
import config from './Login.config';

const { formConfig, LOGIN } = config;

const Login = (props) => {
  const { history } = props;
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const {
    register, handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(LOGIN),
    mode: 'onChange'
  });

  const onSubmit = async (formValue) => {
    await loginUser(formValue, setErrorMessage, setLoading, history);
  };

  const renderFormGroup = (params) => {
    const {
      controlId, label, name, type, prefix, placeholder, isPassword
    } = params;

    return (
      <FormGroup
        controlId={controlId}
        label={label}
        name={name}
        register={register}
        errors={errors}
        type={type}
        prefix={prefix}
        placeholder={placeholder}
        isPassword={isPassword}
      />
    );
  };

  const renderAlert = () => (
    <Alert key="danger" variant="danger">
      {errorMessage}
    </Alert>
  );

  const renderContent = () => (
    <>
      {loading && <LoadingPage />}
      {errorMessage && renderAlert()}
      <Form onSubmit={handleSubmit(onSubmit)}>
        {formConfig.map(renderFormGroup)}
        <div className="d-grid mt-5">
          <Button variant="warning" type="submit">
            Login
          </Button>
        </div>
      </Form>
      <div className="text-center mt-5">
        Without Account?
        {' '}
        <span
          className="text-info"
          style={{ color: 'blue', cursor: 'pointer' }}
          onClick={() => history.push(Paths.Register)}
        >
          Register Now
        </span>
      </div>
    </>
  );

  return (
    <LoginLayout
      title="Register"
      content={renderContent}
      isLoading={false}
    />
  );
};

export default Login;
