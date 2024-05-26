import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { IoEye, IoEyeOff } from 'react-icons/io5';
import DatePicker from 'react-datepicker';
import TimePicker from 'react-bootstrap-time-picker';
import 'react-datepicker/dist/react-datepicker.css';

import './FormGroup.css';

const FormGroup = (props) => {
  const {
    controlId, label, name, register, errors, type, prefix, placeholder,
    isPassword, suffix, setValue, setIsShow, isShow = true
  } = props;
  const [selectedDate, setSelectedDate] = useState(null);
  const [time, setTime] = useState(0);
  const {
    onChange, onBlur, ref
  } = register(name);
  const [isShowPassword, setIsShowPassword] = useState(false);
  const isDropdown = type === 'dropdown';

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setValue(name, date);
  };

  const handleRadioChange = (event) => {
    const { value } = event.target;
    if (value === 'STANDING_INSTRUCTION') {
      setIsShow(true);
    }
    if (value === 'IMMEDIATE') {
      setIsShow(false);
    }
    onChange(event);
  };

  const handleTimeChange = (value) => {
    setTime(value);
    setValue(name, value);
  };

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
      <option value="MAKER">Maker</option>
      <option value="APPROVER">Approver</option>
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

  const renderRadioForm = () => (
    <div className="d-flex" style={{ columnGap: '15px' }}>
      <Form.Check
        type="radio"
        label="Immediate"
        value="IMMEDIATE"
        onChange={handleRadioChange}
        ref={ref}
        onBlur={onBlur}
        name={name}
        defaultChecked
      />
      <Form.Check
        type="radio"
        label="Standing Instruction"
        value="STANDING_INSTRUCTION"
        onChange={handleRadioChange}
        ref={ref}
        onBlur={onBlur}
        name={name}
      />
    </div>
  );

  const renderDatePicker = () => (
    <DatePicker
      style={{ width: '100%' }}
      selected={selectedDate}
      onChange={handleDateChange}
      minDate={new Date()}
      dateFormat="dd MMM yyyy"
      className="form-control"
      placeholderText={placeholder}
    />
  );

  const renderTimePicker = () => (
    <TimePicker
      start="00:00"
      end="23:59"
      step={30}
      value={time}
      onChange={handleTimeChange}
      format={24}
    />
  );

  const renderByType = () => {
    let formComponent = null;

    switch (type) {
      case 'radio':
        formComponent = renderRadioForm();
        break;
      case 'datePicker':
        formComponent = renderDatePicker();
        break;
      case 'timePicker':
        formComponent = renderTimePicker();
        break;
      default:
        formComponent = renderAllForm();
    }
    return (
      <div>
        {formComponent}
      </div>
    );
  };

  return (
    isShow && (
    <Form.Group controlId={controlId} className="mb-4">
      <Form.Label>{label}</Form.Label>
      {renderByType()}
      {errors[name] && <Form.Text className="text-danger error-input">{errors[name].message}</Form.Text>}
    </Form.Group>
    )
  );
};

export default FormGroup;
