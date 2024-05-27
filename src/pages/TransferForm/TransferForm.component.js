import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useForm } from 'react-hook-form';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { FaDownload } from 'react-icons/fa6';
import { FaFileUpload } from 'react-icons/fa';
import * as XLSX from 'xlsx';
import Alert from 'react-bootstrap/Alert';

import TemplateFile from '../../resource/csv/template-transactions.csv';
import { Layout } from '../../component/Layout';
import { LoadingPage } from '../../component/LoadingPage';
import './TransferForm.css';
import config from './TransferForm.config';
import { FormGroup } from '../../component/FormGroup';
import Paths from '../../root/Paths';
import { formatAmount } from '../../utils/amountUtils';

const { formConfig } = config;

const TransferForm = (props) => {
  const { history } = props;
  const [loading, setLoading] = useState(false);
  const [isShowForm, setIsShowForm] = useState(false);
  const [totalAmount, setTotalAmount] = useState(0);
  const [messageInfo, setMessageInfo] = useState({});
  const [jsonData, setJsonData] = useState([]);
  const {
    register, handleSubmit, setValue, setError, clearErrors,
    formState: { errors }
  } = useForm({
    mode: 'onChange'
  });

  useEffect(() => {
    const validateData = (data) => {
      clearErrors('file');
      if (data.length === 0) {
        return;
      }
      const errorNullRow = new Set();
      let amount = 0;
      data.forEach((row, index) => {
        const requiredKeys = ['to_bank_name', 'to_account_no', 'to_account_name', 'transfer_amount'];
        const rowKeys = Object.keys(row);
        const missingKeys = requiredKeys.filter((key) => !rowKeys.includes(key));
        const extraKeys = rowKeys.filter((key) => !requiredKeys.includes(key));

        if (missingKeys.length > 0) {
          setMessageInfo({
            variant: 'danger',
            message: `Row ${index + 1} is missing keys: ${missingKeys.join(', ')}. Please reupload your template`
          });
          setError('file', { message: 'Reupload it again' });
        }
        if (extraKeys.length > 0) {
          setMessageInfo({
            variant: 'danger',
            message: `Row ${index + 1} has extra keys: ${extraKeys.join(', ')}. Please reupload your template`
          });
          setError('file', { message: 'Reupload it again' });
        }

        requiredKeys.forEach((key) => {
          if (row[key] == null || row[key] === '') {
            errorNullRow.add(row);
          }
        });

        amount += row.transfer_amount;
      });
      if (errorNullRow.size > 0) {
        setMessageInfo({
          variant: 'danger',
          message: `After detection, there are ${data.length} transfer record and ${errorNullRow.size} error no match query by issuing bank. Please reupload your template`
        });
        setError('file', { message: 'Reupload it again' });
        return;
      }
      setTotalAmount(amount);
      setMessageInfo({
        variant: 'warning',
        message: `After detection, there are ${data.length} transfer record, the total transfer amount is Rp${formatAmount(amount)}`
      });
    };

    validateData(jsonData);
  }, [jsonData]);

  const onSubmit = async (formValue) => {
    const transactions = jsonData.map((item) => ({
      destinationBankName: item.to_bank_name,
      destinationAccount: item.to_account_no?.toString(),
      destinationAccountName: item.to_account_name,
      amount: item.transfer_amount
    }));

    const payload = {
      instructionType: formValue.instructionType,
      transferDate: formValue.transferDate,
      transferTime: formValue?.transferTime?.toString(),
      totalAmount,
      transactions
    };

    history.push(Paths.ConfirmTransfer, { payload });
  };

  const handleConvert = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = e.target.result;
        const workbook = XLSX.read(data, { type: 'binary' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const json = XLSX.utils.sheet_to_json(worksheet);
        setJsonData(json);
      };
      reader.readAsBinaryString(file);
    }
  };

  const renderTitle = () => (
    <div className="bg-white p-3 my-3 mt-auto rounded">
      <h4 className="no-outline">
        Create Transaction
      </h4>
    </div>
  );

  const renderAlert = (variant, errorMessage) => (
    <Alert key={variant} variant={variant} className="border border-warning">
      {errorMessage}
    </Alert>
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
        onChange={handleConvert}
      />
      <label htmlFor="file" className="file-label">
        <FaFileUpload size={50} color="#FFD400" />
        <div className="upload-text">Choose Your Template</div>
        <div>Only xls, xlsx, or csv format is support</div>
      </label>
      {errors.file && <Form.Text className="text-danger error-input">{errors.file.message}</Form.Text>}
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
              {messageInfo?.variant && renderAlert(messageInfo?.variant, messageInfo?.message)}
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
      {renderTitle()}
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
