import axios from 'axios';

import constants from '../utils/constants';
import Paths from '../root/Paths';

const { URL } = constants;

const formatLoginTime = (date) => {
  const options = {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  };

  return date.toLocaleString('en-GB', options).replace(',', '');
};

const saveSessionLogin = (response) => {
  const { data } = response.data;
  const {
    token, user, corporat, loginTime
  } = data;
  const formattedLoginTime = formatLoginTime(loginTime);
  sessionStorage.setItem('access_token', token);
  sessionStorage.setItem('user', JSON.stringify(user));
  sessionStorage.setItem('corporat', JSON.stringify(corporat));
  sessionStorage.setItem('loginTime', JSON.stringify(formattedLoginTime));
};

const removeSessionLogin = () => {
  sessionStorage.removeItem('access_token');
  sessionStorage.removeItem('user');
  sessionStorage.removeItem('corporat');
  sessionStorage.removeItem('loginTime');
};

export const sendOtp = async (email, setError, setLoading) => {
  try {
    setLoading(true);
    const response = await axios.get(`${URL.service}/api/otp/${email}`);
    saveSessionLogin(response);
  } catch (error) {
    if (!email) {
      setError('email', {
        message: 'Email is required'
      });
      return;
    }
    setError('verificationCode', {
      message: 'Failed send verification code'
    });
  } finally {
    setLoading(false);
  }
};

export const registerUser = async (body, setError, setLoading, history) => {
  try {
    setLoading(true);
    const response = await axios.post(`${URL.service}/api/register`, body);
    saveSessionLogin(response);

    history.push(Paths.Home);
  } catch (error) {
    const { errors } = error?.response?.data;
    const parseErrors = JSON.parse(errors);

    parseErrors.forEach((errorItem) => {
      setError(errorItem.path[0], {
        message: errorItem.message,
      });
    });
  } finally {
    setLoading(false);
  }
};

export const loginUser = async (body, setError, setLoading, history) => {
  try {
    setLoading(true);
    const response = await axios.post(`${URL.service}/api/login`, body);
    saveSessionLogin(response);

    history.push(Paths.Home);
  } catch (error) {
    const { errors } = error?.response?.data;
    setError(errors);
  } finally {
    setLoading(false);
  }
};

export const logoutUser = async (setLoading, history) => {
  try {
    setLoading(true);
    const accessToken = sessionStorage.getItem('access_token');
    const headers = {
      'X-API-TOKEN': accessToken,
    };
    await axios.post(`${URL.service}/api/logout`, null, { headers });
    removeSessionLogin();
    history.replace(Paths.Login);
  } finally {
    setLoading(false);
  }
};

export const getTransactionOverview = async () => {
  try {
    const accessToken = sessionStorage.getItem('access_token');
    const headers = {
      'X-API-TOKEN': accessToken,
    };
    const response = await axios.get(`${URL.service}/api/transactions-overview`, { headers });
    const { data } = response.data;

    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getTransactions = async (page, limit) => {
  try {
    const accessToken = sessionStorage.getItem('access_token');
    const headers = {
      'X-API-TOKEN': accessToken,
    };
    const response = await axios.get(`${URL.service}/api/transactions`, {
      params: {
        page,
        limit,
      },
      headers
    });

    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getTransaction = async (referenceNumber, page, limit) => {
  try {
    const accessToken = sessionStorage.getItem('access_token');
    const headers = {
      'X-API-TOKEN': accessToken,
    };
    const response = await axios.get(`${URL.service}/api/transactions/${referenceNumber}`, {
      params: {
        page,
        limit,
      },
      headers
    });

    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const transfer = async (body, setError, setLoading, history) => {
  try {
    setLoading(true);
    const accessToken = sessionStorage.getItem('access_token');
    const headers = {
      'X-API-TOKEN': accessToken,
    };
    const response = await axios.post(`${URL.service}/api/transactions`, body, { headers });
    const { data } = response.data;

    history.push(Paths.InflightPayment, {
      payload: {
        ...body,
        ...data
      }
    });
  } catch (error) {
    setError('Failed transfer');
  } finally {
    setLoading(false);
  }
};

export const auditTransaction = async (setLoading, referenceNumber, status) => {
  try {
    setLoading(true);
    const accessToken = sessionStorage.getItem('access_token');
    const headers = {
      'X-API-TOKEN': accessToken,
    };
    await axios.post(`${URL.service}/api/transactions-audit/${referenceNumber}`, { status }, { headers });
  } finally {
    setLoading(false);
  }
};
