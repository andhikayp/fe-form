import axios from 'axios';

import constants from '../utils/constants';

const { URL } = constants;

export const createUser = async (body) => {
  const response = await axios.post(`${URL.service}/api/users`, body);

  return response.data;
};
