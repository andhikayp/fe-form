import React, { useEffect, useState } from 'react';
import {
  Table, Pagination, Row, Col
} from 'react-bootstrap';
import { getTransaction } from '../../../api';
import { TableLayout } from '../../../component/TableLayout';
import config from './DetailTransaction.config';

const { tableHeadConfig } = config;

const DetailTransaction = (props) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(2);
  const [data, setData] = useState({});
  const [totalPages, setTotalPages] = useState(1);
  const {
    referenceNumber
  } = props;

  const mappedTransaction = [{
    title: 'From Account No.: ',
    value: data?.sourceAccount,
    position: 'left'
  }, {
    title: 'Submit Date and Time: ',
    value: data?.createdAt,
    position: 'left'
  }, {
    title: 'Transfer Date: ',
    value: data?.createdAt,
    position: 'left'
  }, {
    title: 'Instruction Type: ',
    value: data?.instructionType === 'STANDING_INSTRUCTION' ? 'Standing Instruction' : 'Immediate ',
    position: 'left'
  }, {
    title: 'Maker: ',
    value: data?.makerUser?.username,
    position: 'right'
  }, {
    title: 'Reference No.: ',
    value: data?.referenceNumber,
    position: 'right'
  }, {
    title: 'Transfer Type: ',
    value: data?.transferType,
    position: 'right'
  }];

  useEffect(() => {
    const fetchData = async () => {
      const detailTransaction = await getTransaction(referenceNumber, currentPage, itemsPerPage);
      setData(detailTransaction.data);
      setTotalPages(detailTransaction.totalPages);
    };

    fetchData();
  }, [currentPage, itemsPerPage]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const renderInlineView = (item) => (
    <div className="my-2">
      {item.title}
      <span className="text-dark">{item.value}</span>
    </div>
  );

  const renderTableHeaderItem = (item) => (
    <th style={{ backgroundColor: '#FAFAFA', fontWeight: '400', ...item.style }}>{item.name}</th>
  );

  const renderTableBody = (item, index) => (
    <tr key={item.id}>
      <td className="text-secondary">{index + 1}</td>
      <td className="text-secondary">{item.destinationAccount}</td>
      <td className="text-secondary">{item.destinationAccountName}</td>
      <td className="text-secondary">{item.destinationBankName}</td>
      <td className="text-secondary">{item.amount}</td>
      <td className="text-secondary">-</td>
      <td
        className="text-secondary align-items-center justify-content-center"
        style={{
          position: 'sticky', right: 0, background: 'white'
        }}
      >
        <div className="d-flex column-gap-3 text-warning">
          Awaiting approval
          Rejected
          Approved
        </div>
      </td>
    </tr>
  );

  const renderTable = () => (
    <TableLayout
      renderTableHead={() => tableHeadConfig.map(renderTableHeaderItem)}
      renderTableContent={() => data?.transactions?.map(renderTableBody)}
      totalPages={totalPages}
      currentPage={currentPage}
      handlePageChange={handlePageChange}
    />
  );

  return (
    <div className="bg-white p-3 my-3 mt-auto rounded">
      <div className="bg-light p-3 my-4 mt-auto rounded text-secondary">
        <Row>
          <Col>
            {mappedTransaction.filter((item) => item.position === 'left').map(renderInlineView)}
          </Col>
          <Col>
            {mappedTransaction.filter((item) => item.position === 'right').map(renderInlineView)}
          </Col>
        </Row>
      </div>
      <div className="d-flex column-gap-4">
        <di>
          Total Transfer Record:
          {' '}
          <span className="text-dark"><b>{data.totalTransfer}</b></span>
        </di>
        <di>
          Total Amount:
          {' '}
          <span className="text-dark"><b>{data.totalAmount}</b></span>
        </di>
        <di>
          Estimated Service Fee:
          {' '}
          <span className="text-dark"><b>0</b></span>
        </di>
      </div>
      {renderTable()}
    </div>
  );
};

export default DetailTransaction;
