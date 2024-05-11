import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Layout } from '../../component/Layout';
import { FormGroup } from '../../component/FormGroup';
import { LoadingPage } from '../../component/LoadingPage';
import config from './Home.config';
import { createUser } from '../../api';
import Paths from '../../root/Paths';
import './Home.css';

const { formConfig, REGISTER } = config;

const Home = (props) => {
  const { history } = props;
  const [loading, setLoading] = useState(false);

  const {
    register, handleSubmit, setError,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(REGISTER),
    mode: 'onChange'
  });

  const onSubmit = async (formValue) => {
    setLoading(true);
    const payload = {
      ...formValue,
      phoneNumber: `+62${formValue.phoneNumber.substr()}`
    };

    const response = await createUser(payload, setError);
    if (response) {
      history.push(Paths.DetailUser, { response });
    }
    setLoading(false);
  };

  const renderFormGroup = (params) => {
    const {
      controlId, label, name, type, prefix, placeholder
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
      />
    );
  };

  const renderContent = () => (
    <>
      {loading && <LoadingPage />}
      <Form onSubmit={handleSubmit(onSubmit)}>
        {formConfig.map(renderFormGroup)}
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </>
  );

  return (
    <Layout
      title="Register"
      content={renderContent}
      isLoading={false}
    />
  );
};

export default Home;
