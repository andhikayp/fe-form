import React, { useState, useEffect } from 'react';
import { Table, Pagination } from 'react-bootstrap';
import { IoEye } from 'react-icons/io5';
import { MdBlockFlipped } from 'react-icons/md';
import { FaRegCheckCircle } from 'react-icons/fa';
import Alert from 'react-bootstrap/Alert';

import { Layout } from '../../component/Layout';
import { LoadingPage } from '../../component/LoadingPage';
import { Modal } from '../../component/Modal';
import { auditTransaction, getTransactionOverview, getTransactions } from '../../api';
import './Home.css';
import TransactionOverview from './TransactionOverview.js/TransactionOverview.component';
import constants from '../../utils/constants';
import config from './Home.config';

const { ROLE } = constants;
const { tableHeadConfig } = config;

const Home = () => {
  const [loading, setLoading] = useState(false);
  const loginTime = JSON.parse(sessionStorage.getItem('loginTime'));
  const [overview, setOverview] = useState();
  const [data, setData] = useState([]);
  const [isShowModal, setIsShowModal] = useState(false);
  const [transactionItem, setTransactionItem] = useState({});
  const [action, setAction] = useState();
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(2);
  const [message, setMessage] = useState({});

  const user = JSON.parse(sessionStorage.getItem('user'));
  const { role } = user;

  const handleCloseModal = () => setIsShowModal(false);

  useEffect(() => {
    const fetchData = async () => {
      const transactionOverview = await getTransactionOverview();
      setOverview(transactionOverview);
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const transaction = await getTransactions(currentPage, itemsPerPage);
      setData(transaction.data);
      setTotalPages(transaction.totalPages);
    };

    fetchData();
  }, [currentPage, itemsPerPage]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const renderLoginTime = () => (
    <div className="bg-white p-3 my-3 mt-auto rounded">
      {`Last Login Time: ${loginTime}`}
    </div>
  );

  const handleConfirm = async () => {
    await auditTransaction(setLoading, transactionItem.referenceNumber, action);
    setMessage({
      variant: 'success',
      message: `Transaction ${action === 'APPROVED' ? 'Approved' : 'Rejected'}`
    });
    if (data.length - 1 === 0 && currentPage >= 2) {
      setCurrentPage(currentPage - 1);
      setIsShowModal(false);
      return;
    }
    const transaction = await getTransactions(currentPage, itemsPerPage);
    setData(transaction.data);
    setTotalPages(transaction.totalPages);
    setIsShowModal(false);
  };

  const renderConfirmationModal = () => (
    <Modal
      handleClose={handleCloseModal}
      handleConfirm={handleConfirm}
      show={isShowModal}
      confirmText="Confirm"
      closeText="Cancel"
      content={`Are you sure you want to ${action === 'APPROVED' ? 'approve' : 'reject'} transaction with reference number: ${transactionItem.referenceNumber}?`}
      title="Confirmation"
      variant={action === 'APPROVED' ? 'success' : 'danger'}
    />
  );

  const renderTableHeaderItem = (item) => (
    <th style={{ backgroundColor: '#FAFAFA', fontWeight: '400', ...item.style }}>{item.name}</th>
  );

  const buttonConfig = (item) => [{
    name: 'Approve',
    isShow: role === ROLE.APPROVER,
    icon: <FaRegCheckCircle />,
    onClick: async () => {
      setAction('APPROVED');
      setTransactionItem(item);
      setIsShowModal(true);
    }
  }, {
    name: 'Reject',
    isShow: role === ROLE.APPROVER,
    icon: <MdBlockFlipped />,
    onClick: async () => {
      setAction('REJECTED');
      setTransactionItem(item);
      setIsShowModal(true);
    }
  }, {
    name: 'Detail',
    isShow: true,
    icon: <IoEye />,
    onClick: () => {}
  }];

  const renderButtonAction = (item) => (
    item.isShow && (
      <div
        style={{ cursor: 'pointer' }}
        className="d-flex justify-content-center align-items-center column-gap-1"
        onClick={item.onClick}
      >
        {item.icon}
        <div>
          {item.name}
        </div>
      </div>
    )
  );

  const renderAlert = () => (
    <Alert key={message.variant} variant={message.variant}>
      {message.message}
    </Alert>
  );

  const renderTable = () => (
    <div className="my-5">
      <Table hover>
        <thead className="bg-light">
          <tr className="text-left align-top bg-light">
            {tableHeadConfig.map(renderTableHeaderItem)}
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={item.referenceNumber}>
              <td className="text-secondary">{item.referenceNumber}</td>
              <td className="text-secondary">{item.totalAmount}</td>
              <td className="text-secondary">{item.totalTransfer}</td>
              <td className="text-secondary">{item.sourceAccount}</td>
              <td className="text-secondary">{item.makerUser.username}</td>
              <td className="text-secondary">{item.transferDate}</td>
              <td
                className="text-secondary align-items-center justify-content-center"
                style={{
                  position: 'sticky', right: 0, background: 'white'
                }}
              >
                <div className="d-flex column-gap-3 text-warning">
                  {buttonConfig(item).map(renderButtonAction)}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Pagination
        className="text-warning"
        linkStyle={{ backgroundColor: 'yellow' }}
      >
        {Array.from({ length: totalPages }, (_, i) => (
          <Pagination.Item
            key={i + 1}
            active={i + 1 === currentPage}
            onClick={() => handlePageChange(i + 1)}
          >
            {i + 1}
          </Pagination.Item>
        ))}
      </Pagination>
    </div>
  );

  const renderContent = () => (
    <>
      {renderLoginTime()}
      <div className="bg-white p-3 my-3 mt-auto rounded">
        {message?.message && renderAlert()}
        <TransactionOverview transactionOverview={overview} />
        {renderTable()}
      </div>
      {loading && <LoadingPage />}
      {renderConfirmationModal()}
    </>
  );

  return (
    <Layout
      content={renderContent}
    />
  );
};

export default Home;
