import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';

import { LoadingPage } from '../../component/LoadingPage';
import { Layout } from '../../component/Layout';
import Paths from '../../root/Paths';
import { transfer } from '../../api';

const ConfirmTransfer = (props) => {
  const { history } = props;
  if (!history?.location?.state) {
    history.replace(Paths.Transfer);
  }
  const payload = history?.location?.state?.payload;
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const corporat = JSON.parse(sessionStorage.getItem('corporat'));
  const { corporateAccountNumber } = corporat;

  const renderTitle = () => (
    <div className="bg-white p-3 my-3 mt-auto rounded">
      <h4 className="no-outline">
        Create Transaction
      </h4>
    </div>
  );

  const onSubmit = async (formValue) => {
    await transfer(payload, setErrorMessage, setLoading, history);
  };

  const renderAlert = () => (
    <Alert key="danger" variant="danger">
      {errorMessage}
    </Alert>
  );

  const mappingInstructionType = {
    IMMEDIATE: 'Immediate',
    STANDING_INSTRUCTION: 'Standing Instruction'
  };

  const config = [{
    title: 'Total Transfer Record: ',
    value: payload?.transactions.length,
    withBorder: false
  }, {
    title: 'Total Transfer Amount: ',
    value: payload?.transactions.length,
    withBorder: true
  }, {
    title: 'From Account No.: ',
    value: corporateAccountNumber,
    withBorder: false
  }, {
    title: 'Instruction Type: ',
    value: mappingInstructionType[payload?.instructionType],
    withBorder: false
  }];

  const renderInlineView = (item) => (
    <>
      <div className="my-2">
        {item.title}
        <span className="text-dark">{item.value}</span>
      </div>
      {item.withBorder && <hr className="my-3" />}
    </>
  );
  const renderLayout = () => (
    <div className="bg-white p-3 my-3 mt-auto rounded">
      {errorMessage && renderAlert()}
      <div className="bg-light p-3 my-3 mt-auto rounded text-secondary">
        {config.map(renderInlineView)}
      </div>
      <div className="my-3 d-flex justify-content-center">
        <Button variant="warning" type="button" onClick={onSubmit}>
          Confirm
        </Button>
      </div>
    </div>
  );

  const renderContent = () => (
    <>
      {renderTitle()}
      {renderLayout()}
      {loading && <LoadingPage />}
    </>
  );

  return (
    <Layout
      content={renderContent}
    />
  );
};

export default ConfirmTransfer;
