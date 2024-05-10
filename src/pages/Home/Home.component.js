import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Layout } from '../../component/Layout';
import { FormGroup } from '../../component/FormGroup';
import config from './Home.config';
import { createUser } from '../../api';
import Paths from '../../root/Paths';

const { formConfig, REGISTER } = config;

const Home = (props) => {
  const { history } = props;

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(REGISTER),
    mode: 'onChange'
  });

  const onSubmit = async (formValue) => {
    const payload = {
      ...formValue,
      phoneNumber: `+62${formValue.phoneNumber.substr(1)}`
    };

    const response = await createUser(payload);
    console.log('response', response);
    history.push(Paths.DetailUser, { response });
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
    <Form onSubmit={handleSubmit(onSubmit)}>
      {formConfig.map(renderFormGroup)}
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
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
