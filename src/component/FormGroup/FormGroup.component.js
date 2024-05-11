import React from 'react';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

import './FormGroup.css';

const FormGroup = (props) => {
  const {
    controlId, label, name, register, errors, type, prefix, placeholder
  } = props;
  const { onChange, onBlur, ref } = register(name);

  const renderFormControl = () => (
    <Form.Control
      type={type}
      onChange={onChange}
      ref={ref}
      onBlur={onBlur}
      name={name}
      placeholder={placeholder}
    />
  );

  const renderFormWithPrefix = () => (
    <InputGroup>
      <InputGroup.Text>
        {prefix}
      </InputGroup.Text>
      {renderFormControl()}
    </InputGroup>
  );

  return (
    <Form.Group controlId={controlId} className="mb-3">
      <Form.Label>{label}</Form.Label>
      {prefix ? renderFormWithPrefix() : renderFormControl()}
      {errors[name] && <Form.Text className="text-danger error-input">{errors[name].message}</Form.Text>}
    </Form.Group>
  );
};

export default FormGroup;
