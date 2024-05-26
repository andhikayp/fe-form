import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import { FaCircleCheck } from 'react-icons/fa6';

import { Layout } from '../../component/Layout';
import Paths from '../../root/Paths';

const ConfirmTransfer = (props) => {
  const { history } = props;
  if (!history?.location?.state) {
    history.replace(Paths.Transfer);
  }
  const payload = history?.location?.state?.payload;
  const corporat = JSON.parse(sessionStorage.getItem('corporat'));
  const { corporateAccountNumber } = corporat;

  const renderTitle = () => (
    <div className="bg-white p-3 my-3 mt-auto rounded">
      <h4 className="no-outline">
        Create Transaction
      </h4>
    </div>
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
  }, {
    title: 'Transfer Type: ',
    value: payload?.transferType,
    withBorder: false
  }, {
    title: 'Reference No.: ',
    value: payload?.referenceNumber,
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

  const handleTransfer = () => {
    history.push(Paths.Transfer);
  };

  const handleToHome = () => {
    history.push(Paths.Home);
  };

  const renderInformation = () => (
    <div className="d-flex justify-content-center flex-column align-items-center row-gap-2 my-5">
      <FaCircleCheck style={{ width: '67px', height: '67px', color: '#5ABF1E' }} />
      <h3 className="mt-2">
        Submitted successfully, waiting for review
      </h3>
      <div>
        The transfer application will be invalidated on
        {' '}
        <b>23:59</b>
        , please notify approver for review in time
      </div>
    </div>
  );

  const renderLayout = () => (
    <div className="bg-white p-3 my-3 mt-auto rounded">
      {renderInformation()}
      <div className="bg-light p-3 my-3 mt-auto rounded text-secondary">
        {config.map(renderInlineView)}
      </div>
      <div className="my-4 d-flex justify-content-center column-gap-3">
        <Button variant="warning" type="button" onClick={handleTransfer}>
          Transfer One More Time
        </Button>
        <Button variant="outline-secondary" type="button" onClick={handleToHome}>
          Back Home
        </Button>
      </div>
    </div>
  );

  const renderContent = () => (
    <>
      {renderTitle()}
      {renderLayout()}
    </>
  );

  return (
    <Layout
      content={renderContent}
    />
  );
};

export default ConfirmTransfer;
