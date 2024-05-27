import React, { useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';

import { getTransaction } from '../../../api';
import { TableLayout } from '../../../component/TableLayout';
import config from './DetailTransaction.config';

const { tableHeadConfig, mappedTransaction, informationConfig } = config;

const DetailTransaction = (props) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [data, setData] = useState({});
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const { referenceNumber } = props;

  useEffect(() => {
    const fetchData = async () => {
      const detailTransaction = await getTransaction(referenceNumber, currentPage, itemsPerPage);
      setData(detailTransaction.data);
      setTotalPages(detailTransaction.totalPages);
      setTotalItems(detailTransaction.count);
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

  const renderTableBody = (item, index) => {
    const statusFormat = {
      REJECTED: '• Rejected',
      WAITING: '• Awaiting approval',
      APPROVED: '• Approved'
    };

    return (
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
            position: 'sticky', right: 0, background: 'white', minWidth: '160px'
          }}
        >
          <div className="d-flex column-gap-3">
            <div>
              {statusFormat[data.status]}
            </div>
          </div>
        </td>
      </tr>
    );
  };

  const renderTable = () => (
    <TableLayout
      tableHeadConfig={tableHeadConfig}
      renderTableContent={() => data.transactions?.map(renderTableBody)}
      totalPages={totalPages}
      currentPage={currentPage}
      handlePageChange={handlePageChange}
      totalItems={totalItems}
      setItemsPerPage={setItemsPerPage}
      isEmpty={data.transactions?.length === 0}
    />
  );

  const renderInformationItem = (item) => (
    <di>
      {item.name}
      <span className="text-dark"><b>{item.value}</b></span>
    </di>
  );

  return (
    <div className="bg-white p-3 my-3 mt-auto rounded">
      <div className="bg-light p-3 my-4 mt-auto rounded text-secondary">
        <Row>
          <Col sm={12} md={6}>
            {mappedTransaction(data).filter((item) => item.position === 'left').map(renderInlineView)}
          </Col>
          <Col sm={12} md={6}>
            {mappedTransaction(data).filter((item) => item.position === 'right').map(renderInlineView)}
          </Col>
        </Row>
      </div>
      <div className="d-flex column-gap-4">
        {informationConfig(data).map(renderInformationItem)}
      </div>
      {renderTable()}
    </div>
  );
};

export default DetailTransaction;
