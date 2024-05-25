import React, { useState, useEffect } from 'react';

import { Layout } from '../../component/Layout';
import { LoadingPage } from '../../component/LoadingPage';
import { getTransactionOverview } from '../../api';
import './Home.css';
import TransactionOverview from './TransactionOverview.js/TransactionOverview.component';

const Home = () => {
  const [loading, setLoading] = useState(false);
  const loginTime = JSON.parse(sessionStorage.getItem('loginTime'));
  const [overview, setOverview] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const data = await getTransactionOverview();
      setOverview(data);
    };

    fetchData();
  }, []);

  const renderLoginTime = () => (
    <div className="bg-white p-3 my-3 mt-auto rounded">
      {`Last Login Time: ${loginTime}`}
    </div>
  );

  const renderTransactionOverview = () => (
    <div className="bg-white p-3 my-3 mt-auto rounded">
      <TransactionOverview transactionOverview={overview} />
    </div>
  );

  const renderContent = () => (
    <>
      {renderLoginTime()}
      {renderTransactionOverview()}
      {loading && <LoadingPage />}
    </>
  );

  return (
    <Layout
      content={renderContent}
    />
  );
};

export default Home;
