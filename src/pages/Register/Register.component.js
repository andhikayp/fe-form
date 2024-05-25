import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import TimePicker from 'react-bootstrap-time-picker';
import 'bootstrap/dist/css/bootstrap.min.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import { FormGroup } from '../../component/FormGroup';
import { LoginLayout } from '../../component/LoginLayout';
import config from './Register.config';
import { LoadingPage } from '../../component/LoadingPage';
import Paths from '../../root/Paths';

const { formConfig, REGISTER } = config;

const Register = (props) => {
  const { history } = props;
  const [loading, setLoading] = useState(false);
  console.log(formConfig, 'formConfig');
  const [time, setTime] = useState(0);
  const [selectedDate, setSelectedDate] = useState(null);
  console.log(selectedDate, 'selectedDate');

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleChange = (value) => {
    setTime(value);
  };

  const {
    register, handleSubmit, setError,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(REGISTER),
    mode: 'onChange'
  });

  const renderSubmitOtp = () => {
    const handleSubmitOtp = () => {};

    return (
      <div onClick={handleSubmitOtp} className="cursor-pointer">Send OTP Code</div>
    );
  };

  const onSubmit = async (formValue) => {
    setLoading(true);

    // const response = await createUser(payload, setError);
    setLoading(false);
    history.push(Paths.DetailUser, { response });
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

  const formatTime = (value) => {
    const hours = Math.floor(value / 3600);
    const minutes = Math.floor((value % 3600) / 60);
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  };

  const renderContent = () => {
    console.log();

    return (
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
        <TimePicker
          start="00:00"
          end="23:59"
          step={30}
          value={time}
          onChange={handleChange}
          format={24}
        />
        <DatePicker
          selected={selectedDate}
          onChange={handleDateChange}
          minDate={new Date()}
          dateFormat="yyyy-MM-dd"
          className="form-control"
          placeholderText="Select a date later than today"
        />
        {/* {selectedDate} */}
        <p>
          Selected Time:
          {formatTime(time)}
          {time}
        </p>

        <div className="text-center mt-5">
          Already have an account?
          {' '}
          <span
            className="text-warning"
            style={{ cursor: 'pointer' }}
            onClick={() => history.push(Paths.Login)}
          >
            Login Now
          </span>
        </div>
      </>
    );
  };

  return (
    <LoginLayout
      title="Register"
      content={renderContent}
      isLoading={false}
    />
  );
};

export default Register;
