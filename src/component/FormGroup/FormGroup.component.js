import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { IoEye, IoEyeOff } from 'react-icons/io5';

import './FormGroup.css';

const FormGroup = (props) => {
  const {
    controlId, label, name, register, errors, type, prefix, placeholder,
    isPassword, suffix
  } = props;
  const { onChange, onBlur, ref } = register(name);
  const [isShowPassword, setIsShowPassword] = useState(false);
  const isDropdown = type === 'dropdown';

  const handleType = () => (isShowPassword ? 'text' : 'password');

  const renderFormControl = () => (
    <Form.Control
      type={isPassword ? handleType() : type}
      onChange={onChange}
      ref={ref}
      onBlur={onBlur}
      name={name}
      placeholder={placeholder}
    />
  );

  const renderDropdown = () => (
    <Form.Select
      onChange={onChange}
      ref={ref}
      onBlur={onBlur}
      name={name}
    >
      <option value="" disabled selected>{placeholder}</option>
      <option value="Maker">Maker</option>
      <option value="Approver">Approver</option>
    </Form.Select>
  );

  const renderForm = () => (
    isDropdown ? renderDropdown() : renderFormControl()
  );

  const renderSuffix = () => (
    <InputGroup.Text>
      {suffix()}
    </InputGroup.Text>
  );

  const renderPrefix = () => (
    <InputGroup.Text>
      {prefix}
    </InputGroup.Text>
  );

  const renderShowPassword = () => (
    <InputGroup.Text onClick={() => { setIsShowPassword(!isShowPassword); }}>
      {isShowPassword
        ? <IoEye />
        : <IoEyeOff />}
    </InputGroup.Text>
  );

  const renderAllForm = () => (
    <InputGroup>
      {prefix && renderPrefix()}
      {renderForm()}
      {isPassword && renderShowPassword()}
      {suffix && renderSuffix()}
    </InputGroup>
  );

  return (
    <Form.Group controlId={controlId} className="mb-4">
      <Form.Label>{label}</Form.Label>
      {renderAllForm()}
      {errors[name] && <Form.Text className="text-danger error-input">{errors[name].message}</Form.Text>}
    </Form.Group>
  );
};

export default FormGroup;
