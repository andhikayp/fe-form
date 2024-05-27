import React, { useState, useEffect } from 'react';
import { IoEye } from 'react-icons/io5';
import { MdBlockFlipped } from 'react-icons/md';
import { FaRegCheckCircle } from 'react-icons/fa';
import Alert from 'react-bootstrap/Alert';

import { Layout } from '../../component/Layout';
import { LoadingPage } from '../../component/LoadingPage';
import { Modal } from '../../component/Modal';
import { TableLayout } from '../../component/TableLayout';

import { auditTransaction, getTransactionOverview, getTransactions } from '../../api';
import './Home.css';
import TransactionOverview from './TransactionOverview/TransactionOverview.component';
import DetailTransaction from './DetailTransaction/DetailTransaction.component';
import constants from '../../utils/constants';
import config from './Home.config';
import { formatDate, formatDatetime } from '../../utils/dateUtils';

const { ROLE } = constants;
const { tableHeadConfig } = config;

const Home = () => {
  const [loading, setLoading] = useState(false);
  const loginTime = JSON.parse(sessionStorage.getItem('loginTime'));
  const [overview, setOverview] = useState();
  const [data, setData] = useState([]);
  const [isShowModal, setIsShowModal] = useState(false);
  const [isShowDetail, setIsShowDetail] = useState(false);
  const [transactionItem, setTransactionItem] = useState({});
  const [action, setAction] = useState();
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
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
      setTotalItems(transaction.count);
    };

    fetchData();
  }, [currentPage, itemsPerPage]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const renderLoginTime = () => (
    <div className="bg-white p-3 my-3 mt-auto rounded">
      {`Last Login Time: ${formatDatetime(loginTime)}`}
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
    setTotalItems(transaction.count);
    setData(transaction.data);
    setTotalPages(transaction.totalPages);
    setIsShowModal(false);
  };

  const renderConfirmationContent = () => (
    <div>
      Are you sure you want to
      {' '}
      {action === 'APPROVED' ? 'approve' : 'reject'}
      {' '}
      transaction with reference number:
      {' '}
      {transactionItem.referenceNumber}
      ?`
    </div>
  );

  const renderConfirmationModal = () => (
    <Modal
      handleClose={handleCloseModal}
      handleConfirm={handleConfirm}
      show={isShowModal}
      confirmText="Confirm"
      closeText="Cancel"
      content={renderConfirmationContent}
      title="Confirmation"
      variant={action === 'APPROVED' ? 'success' : 'danger'}
    />
  );

  const renderDetailContent = () => (<DetailTransaction referenceNumber={transactionItem.referenceNumber} />);

  const renderDetailModal = () => (
    <Modal
      handleClose={() => setIsShowDetail(false)}
      show={isShowDetail}
      content={renderDetailContent}
      title="Detail Transaction"
      isShowFooter={false}
      fullscreen
    />
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
    onClick: () => {
      setTransactionItem(item);
      setIsShowDetail(true);
    }
  }];

  const renderButtonAction = (item) => (
    item.isShow && (
      <div
        style={{ cursor: 'pointer' }}
        className="d-flex justify-content-center align-items-center column-gap-1"
        onClick={item.onClick}
      >
        {item.icon}
        <div>{item.name}</div>
      </div>
    )
  );

  const renderAlert = () => (
    <Alert key={message.variant} variant={message.variant}>
      {message.message}
    </Alert>
  );

  const renderTableBody = (item) => (
    <tr key={item.referenceNumber}>
      <td className="text-secondary">{item.referenceNumber}</td>
      <td className="tex  t-secondary">{item.totalAmount}</td>
      <td className="text-secondary">{item.totalTransfer}</td>
      <td className="text-secondary">{item.sourceAccount}</td>
      <td className="text-secondary">{item.makerUser.username}</td>
      <td className="text-secondary">{item.transferDate ? formatDate(item.transferDate) : '-'}</td>
      <td
        className="text-secondary align-items-center justify-content-center"
        style={{
          position: 'sticky', right: 0, background: 'white'
        }}
      >
        <div className="d-flex column-gap-3 text-orange">
          {buttonConfig(item).map(renderButtonAction)}
        </div>
      </td>
    </tr>
  );

  const renderTable = () => (
    <TableLayout
      tableHeadConfig={tableHeadConfig}
      renderTableContent={() => data.map(renderTableBody)}
      totalPages={totalPages}
      currentPage={currentPage}
      handlePageChange={handlePageChange}
      totalItems={totalItems}
      setItemsPerPage={setItemsPerPage}
      isEmpty={data.length === 0}
    />
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
      {renderDetailModal()}
    </>
  );

  return (
    <Layout content={renderContent} />
  );
};

export default Home;
