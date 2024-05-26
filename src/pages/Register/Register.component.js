import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { FormGroup } from '../../component/FormGroup';
import { LoginLayout } from '../../component/LoginLayout';
import config from './Register.config';
import { LoadingPage } from '../../component/LoadingPage';
import Paths from '../../root/Paths';
import { registerUser, sendOtp } from '../../api';

const { formConfig, REGISTER } = config;

const Register = (props) => {
  const { history } = props;
  const [loading, setLoading] = useState(false);

  const {
    register, handleSubmit, setError, getValues,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(REGISTER),
    mode: 'onChange'
  });

  const renderSubmitOtp = () => {
    const handleSubmitOtp = async () => {
      const email = getValues('email');
      await sendOtp(email, setError, setLoading);
    };

    return (
      <div onClick={handleSubmitOtp} style={{ cursor: 'pointer' }}>Send OTP Code</div>
    );
  };

  const onSubmit = async (formValue) => {
    await registerUser(formValue, setError, setLoading, history);
  };

  const renderFormGroup = (params) => {
    const {
      controlId, label, name, type, prefix, placeholder, isPassword, suffix
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
        suffix={suffix}
      />
    );
  };

  const renderContent = () => (
    <>
      {loading && <LoadingPage />}
      <Form onSubmit={handleSubmit(onSubmit)}>
        {formConfig(renderSubmitOtp).map(renderFormGroup)}
        <div className="d-grid mt-5">
          <Button variant="warning" type="submit">
            Login
          </Button>
        </div>
      </Form>

      <div className="text-center mt-5">
        Already have an account?
        {' '}
        <span
          className="text-orange"
          style={{ cursor: 'pointer' }}
          onClick={() => history.push(Paths.Login)}
        >
          Login Now
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

export default Register;
