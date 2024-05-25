import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { FormGroup } from '../../component/FormGroup';
import { LoginLayout } from '../../component/LoginLayout';
import config from './Login.config';
import { LoadingPage } from '../../component/LoadingPage';
import Paths from '../../root/Paths';

const { formConfig, LOGIN } = config;

const Login = (props) => {
  const { history } = props;
  const [loading, setLoading] = useState(false);
  const {
    register, handleSubmit, setError,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(LOGIN),
    mode: 'onChange'
  });

  const onSubmit = async (formValue) => {
    setLoading(true);

    // const response = await createUser(payload, setError);
    setLoading(false);
    history.push(Paths.DetailUser, { response });
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

  const renderContent = () => (
    <>
      {loading && <LoadingPage />}
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
