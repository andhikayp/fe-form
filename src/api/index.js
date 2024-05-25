import axios from 'axios';

import constants from '../utils/constants';

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

export const registerUser = async (body, setError) => {
  try {
    const response = await axios.post(`${URL.service}/api/register`, body);
    saveSessionLogin(response);

    return response;
  } catch (error) {
    const { errors } = error?.response?.data;
    const parseErrors = JSON.parse(errors);

    parseErrors.forEach((errorItem) => {
      setError(errorItem.path[0], {
        message: errorItem.message,
      });
    });
  }
};
