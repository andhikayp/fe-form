import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useForm } from 'react-hook-form';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { FaDownload } from 'react-icons/fa6';
import { FaFileUpload } from 'react-icons/fa';

import TemplateFile from '../../resource/csv/template-transactions.csv';
import { Layout } from '../../component/Layout';
import { LoadingPage } from '../../component/LoadingPage';
import './TransferForm.css';
import config from './TransferForm.config';
import { FormGroup } from '../../component/FormGroup';

const { formConfig } = config;

const TransferForm = () => {
  const [loading, setLoading] = useState(false);
  const [isShowForm, setIsShowForm] = useState(false);
  const loginTime = JSON.parse(sessionStorage.getItem('loginTime'));

  const {
    register, handleSubmit, setValue,
    formState: { errors }
  } = useForm({
    mode: 'onChange'
  });

  const onSubmit = async (formValue) => {
    console.log(formValue, 'formValue');
  };

  const renderLoginTime = () => (
    <div className="bg-white p-3 my-3 mt-auto rounded">
      <h4 className="no-outline">
        Create Transaction
      </h4>
    </div>
  );

  const renderFormGroup = (params) => {
    const {
      controlId, label, name, type, prefix, placeholder, isPassword,
      setIsShow, isShow
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
        setValue={setValue}
        setIsShow={setIsShow}
        isShow={isShow}
      />
    );
  };

  const renderDownloadTemplate = () => {
    const handleDownload = () => {
      const link = document.createElement('a');
      link.href = TemplateFile;
      link.download = 'template-transactions.csv';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    };

    return (
      <div
        className="text-warning mb-4"
        style={{
          display: 'flex', columnGap: '8px', alignItems: 'center'
        }}
      >
        <FaDownload
          onClick={handleDownload}
          style={{ cursor: 'pointer' }}
        />
        <div
          onClick={handleDownload}
          style={{ cursor: 'pointer' }}
        >
          Download Excel
        </div>
      </div>
    );
  };

  const renderUploadTemplate = () => (
    <Form.Group controlId="formFile" className="my-3 custom-upload">
      <Form.Control
        type="file"
        accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
        {...register('file', {
          required: 'File is required',
          validate: {
            acceptedFormats: (files) => ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/vnd.ms-excel', 'text/csv'].includes(files[0]?.type) || 'Only CSV or Excel files are allowed'
          }
        })}
      />
      <label htmlFor="file" className="file-label">
        <FaFileUpload size={50} color="#FFD400" />
        <div className="upload-text">Choose Your Template</div>
        <div>Only xls, xlsx, or csv format is support</div>
      </label>
    </Form.Group>
  );

  const renderFormSection = () => (
    <div
      className="d-flex justify-content-center align-items-center"
    >
      <Container>
        <Row className="justify-content-md-center">
          <Col xs={12} md={8} className="bg-white">
            <Form onSubmit={handleSubmit(onSubmit)}>
              {renderUploadTemplate()}
              {renderDownloadTemplate()}
              {formConfig(isShowForm, setIsShowForm).map(renderFormGroup)}
              <div className="my-3">
                <Button variant="warning" type="submit">
                  Next
                </Button>
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );

  const renderFormLayout = () => (
    <>
      <div className="bg-white p-3 mt-3 mt-auto rounded-top border-bottom">
        <h4 className="no-outline text-center">
          Please enter transfer information
        </h4>
      </div>
      <div className="bg-white p-3 my-3 mt-auto rounded-bottom">
        {renderFormSection()}
      </div>
    </>
  );

  const renderContent = () => (
    <>
      {renderLoginTime()}
      {renderFormLayout()}
      {loading && <LoadingPage />}
    </>
  );

  return (
    <Layout
      content={renderContent}
    />
  );
};

export default TransferForm;
