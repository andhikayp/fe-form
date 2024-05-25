import axios from 'axios';

import constants from '../utils/constants';
import Paths from '../root/Paths';

const { URL } = constants;

const formatLoginTime = (time) => new Date(time).toLocaleString('en-US', {
  day: 'numeric',
  month: 'short',
  year: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
  second: 'numeric',
  hour12: false,
});

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
