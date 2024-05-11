import constants from '../utils/constants';

const { URL } = constants;

const formatPhoneNumber = (phoneNumber) => {
  if (phoneNumber.startsWith('+62')) {
    return `0${phoneNumber.substr(3)}`;
  }
  return phoneNumber;
};

export const createUser = async (body, setError) => {
  try {
    const response = {
      data: {
        ...body,
        phoneNumber: formatPhoneNumber(body.phoneNumber)
      }
    };

    return response;
  } catch (error) {
    const { errors } = error.response.data;
    errors.forEach((errorItem) => {
      setError(errorItem.path[0], {
        message: errorItem.message,
      });
    });
  }
};
