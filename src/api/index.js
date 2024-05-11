/* eslint-disable consistent-return */
import axios from 'axios';

import constants from '../utils/constants';

const { URL } = constants;

export const createUser = async (body, setError) => {
  try {
    const response = await axios.post(`${URL.service}/api/users`, body);

    return response.data;
  } catch (error) {
    const { errors } = error.response.data;
    errors.forEach((errorItem) => {
      setError(errorItem.path[0], {
        message: errorItem.message,
      });
    });
  }
};
